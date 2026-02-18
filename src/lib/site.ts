export const SITE_NAME = "BridgeAtlas";

/**
 * Canonical site URL.
 * - In production on Vercel: set NEXT_PUBLIC_SITE_URL to your domain (e.g. https://bridgeatlas.com)
 * - Fallback: localhost
 */
export const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.startsWith("http")) return explicit.replace(/\/$/, "");

  // Vercel provides VERCEL_URL as host (no protocol). Use it as a safe production default.
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
})();
