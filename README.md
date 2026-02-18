# BridgeAtlas

Curated bridges + an always-visible in-app AI guide.

## Setup

```bash
cd bridgeatlas
cp .env.example .env.local
# set OPENAI_API_KEY in .env.local
npm install
npm run dev
```

Open http://localhost:3000

## AI assistant

- Widget is always visible (bottom-right).
- Server route: `POST /api/assistant`
- Model defaults to `gpt-4o-mini` (override with `OPENAI_MODEL`).

## Content

Bridge data lives in `src/lib/bridges.ts`.

Add bridges by extending the `bridges` array. Keep facts sourced.
