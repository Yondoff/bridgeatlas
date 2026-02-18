import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Import TS module via dynamic transpile is annoying; we’ll parse source URLs from the file.
const bridgesPath = path.join(projectRoot, "src/lib/bridges.ts");
const src = fs.readFileSync(bridgesPath, "utf8");

// Very lightweight slug+wiki URL extraction.
const bridgeBlocks = src.split(/\n\s*\{\n/).slice(1);
const entries = [];
for (const block of bridgeBlocks) {
  const slug = block.match(/\s*slug:\s*"([^"]+)"/m)?.[1];
  if (!slug) continue;
  const name = block.match(/\s*name:\s*"([^"]+)"/m)?.[1] ?? slug;
  const hasPhoto = /\s*photo:\s*\{/m.test(block);
  const wikiUrl = block.match(/\{\s*label:\s*"Wikipedia"\s*,\s*url:\s*"([^"]+)"\s*\}/m)?.[1];
  entries.push({ slug, name, hasPhoto, wikiUrl });
}

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
  // upload.wikimedia.org/wikipedia/commons/<hash>/<hash>/<FileName>
  try {
    const u = new URL(originalUrl);
    const parts = u.pathname.split("/");
    const fileName = parts[parts.length - 1];
    if (!fileName) return null;
    if (u.pathname.includes("/wikipedia/commons/")) {
      return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchSummary(title) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(api, {
    headers: {
      "accept": "application/json",
      // be nice
      "user-agent": "BridgeAtlasPhotoBot/1.0 (https://example.invalid)"
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

const photosBySlug = {};

for (const e of entries) {
  if (e.hasPhoto) continue;
  if (!e.wikiUrl) continue;

  const title = wikiTitleFromUrl(e.wikiUrl);
  if (!title) continue;

  try {
    const summary = await fetchSummary(title);
    const original = summary?.originalimage?.source;
    if (!original) continue;

    const commonsSource = commonsFileUrlFromUpload(original);

    photosBySlug[e.slug] = {
      url: original,
      caption: e.name,
      credit: original.includes("/wikipedia/commons/") ? "Wikimedia Commons" : "Wikipedia",
      sourceUrl: commonsSource ?? e.wikiUrl,
    };

    console.error(`+ ${e.slug}`);
  } catch (err) {
    console.error(`! ${e.slug}: ${err.message}`);
  }
}

process.stdout.write(JSON.stringify(photosBySlug, null, 2));
