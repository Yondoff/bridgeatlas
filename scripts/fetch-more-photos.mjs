import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/lib/bridges.ts", import.meta.url), "utf8");
const blocks = src.split(/\n\s*\{\n/).slice(1);

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

const missing = [];
for (const block of blocks) {
  const slug = block.match(/\s*slug:\s*"([^"]+)"/m)?.[1];
  if (!slug) continue;

  const inline = /\s*photo:\s*\{/m.test(block);
  const mapped = src.includes(`\"${slug}\": {`);
  if (inline || mapped) continue;

  const name = block.match(/\s*name:\s*"([^"]+)"/m)?.[1] ?? slug;
  const urls = [...block.matchAll(/url:\s*"(https?:\/\/[^\"]+)"/g)].map((m) => m[1]);
  const wiki = urls.find((u) => u.includes("en.wikipedia.org/wiki/"));
  missing.push({ slug, name, wiki });
}

const out = {};
for (const e of missing) {
  if (!e.wiki) continue;
  const title = wikiTitleFromUrl(e.wiki);
  if (!title) continue;

  try {
    const summary = await fetchSummary(title);
    const original = summary?.originalimage?.source;
    if (!original) continue;

    out[e.slug] = {
      url: original,
      caption: e.name,
      credit: original.includes("/wikipedia/commons/") ? "Wikimedia Commons" : "Wikipedia",
      sourceUrl: commonsFileUrlFromUpload(original) ?? e.wiki,
    };
    console.error(`+ ${e.slug}`);
  } catch (err) {
    console.error(`! ${e.slug}: ${err.message}`);
  }
}

process.stdout.write(JSON.stringify(out, null, 2));
