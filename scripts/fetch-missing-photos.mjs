import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/lib/bridges.ts", import.meta.url), "utf8");

const missingSlugs = [
  "danyang-kunshan-grand-bridge",
  "changhua-kaohsiung-viaduct",
  "weinan-weihe-grand-bridge",
  "lake-pontchartrain-causeway",
  "qingdao-jiaozhou-bay-bridge",
  "clifton-suspension-bridge",
  "pontcysyllte-aqueduct",
  "yavuz-sultan-selim-bridge",
  "fatih-sultan-mehmet-bridge",
  "15-july-martyrs-bridge",
  "hohenzollern-bridge",
  "kohlbrandbrucke",
  "rio-niteroi-bridge",
  "octavio-frias-de-oliveira-bridge",
  "nelson-mandela-bridge",
  "maputo-katembe-bridge",
  "6th-october-bridge",
  "petersen-bridge",
  "george-washington-bridge",
];

function wikiTitleFromUrl(url) {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/wiki\/(.+)$/);
    if (!m) return null;
    return decodeURIComponent(m[1]);
  } catch {
    return null;
  }
}

function commonsFileUrlFromUpload(originalUrl) {
  try {
    const u = new URL(originalUrl);
    const parts = u.pathname.split("/");
    const fileName = parts[parts.length - 1];
    if (u.pathname.includes("/wikipedia/commons/") && fileName) {
      return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;
    }
  } catch {
    // ignore
  }
  return null;
}

async function fetchSummary(title) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(api, {
    headers: {
      accept: "application/json",
      "user-agent": "BridgeAtlasPhotoBot/1.0",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function extractBridgeBlock(slug) {
  const idx = src.indexOf(`slug: \"${slug}\"`);
  if (idx < 0) return null;
  const start = src.lastIndexOf("\n  {", idx);
  const end = src.indexOf("\n  },", idx);
  if (start < 0 || end < 0) return null;
  return src.slice(start, end + 5);
}

const out = {};

for (const slug of missingSlugs) {
  const block = extractBridgeBlock(slug);
  if (!block) {
    console.error(`! no block: ${slug}`);
    continue;
  }

  const name = block.match(/\n\s*name:\s*\"([^\"]+)\"/)?.[1] ?? slug;
  const urls = [...block.matchAll(/url:\s*\"(https?:\/\/[^\"]+)\"/g)].map((m) => m[1]);
  const wiki = urls.find((u) => u.includes("en.wikipedia.org/wiki/"));

  if (!wiki) {
    console.error(`! no enwiki url: ${slug}`);
    continue;
  }

  const title = wikiTitleFromUrl(wiki);
  if (!title) {
    console.error(`! no title: ${slug}`);
    continue;
  }

  try {
    const summary = await fetchSummary(title);
    const original = summary?.originalimage?.source;
    if (!original) {
      console.error(`! no image in summary: ${slug} (${title})`);
      continue;
    }

    out[slug] = {
      url: original,
      caption: name,
      credit: original.includes("/wikipedia/commons/") ? "Wikimedia Commons" : "Wikipedia",
      sourceUrl: commonsFileUrlFromUpload(original) ?? wiki,
    };

    console.error(`+ ${slug}`);
  } catch (err) {
    console.error(`! ${slug}: ${err.message}`);
  }
}

process.stdout.write(JSON.stringify(out, null, 2));
