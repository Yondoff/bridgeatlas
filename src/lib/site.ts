export const SITE_NAME = "BridgeAtlas";

/**
 * Canonical site URL.
 * - In production on Vercel: set NEXT_PUBLIC_SITE_URL to your domain (e.g. https://bridgeatlas.com)
 * - Fallback: localhost
 */
export const SITE_URL = (() => {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && env.startsWith("http")) return env.replace(/\/$/, "");
  return "http://localhost:3000";
})();
