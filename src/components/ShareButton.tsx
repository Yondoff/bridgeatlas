"use client";

import { useState } from "react";

export default function ShareButton(props: {
  title: string;
  /** Absolute URL (preferred when you have it). */
  url?: string;
  /** Path (e.g. /bridges/golden-gate-bridge). Used to compute absolute URL on the client. */
  path?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl =
    props.url ??
    (typeof window !== "undefined"
      ? `${window.location.origin}${props.path ?? ""}`
      : props.path ?? "");

  async function copy() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = absoluteUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${props.title} — BridgeAtlas`
  )}&url=${encodeURIComponent(absoluteUrl)}`;

  return (
    <div className={props.className}>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-xs font-bold text-ink/80 hover:bg-white transition"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={tweetHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent text-white px-4 py-2 text-xs font-bold hover:bg-accentDeep transition"
        >
          Share on X
        </a>
      </div>
    </div>
  );
}
