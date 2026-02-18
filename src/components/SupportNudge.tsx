"use client";

import { useEffect, useMemo, useState } from "react";

const SUPPORT_URL = "https://ko-fi.com/bridgeatlas";

type Props = {
  title?: string;
  locale?: "en" | "fr";
};

function now() {
  return Date.now();
}

function days(n: number) {
  return n * 24 * 60 * 60 * 1000;
}

export default function SupportNudge(props: Props) {
  const locale = props.locale ?? "en";

  const t = useMemo(() => {
    return locale === "fr"
      ? {
          heading: "Soutenir BridgeAtlas",
          body:
            "BridgeAtlas est un projet indépendant (sans pubs). Si tu as aimé cette fiche, tu peux aider à financer l’hébergement et le temps de recherche.",
          primary: "Faire un don",
          secondary: "Pas maintenant",
          hint: "On te le propose rarement (pas de spam).",
        }
      : {
          heading: "Support BridgeAtlas",
          body:
            "BridgeAtlas is an independent project (no ads). If you enjoyed this page, you can help cover hosting and research time.",
          primary: "Donate",
          secondary: "Not now",
          hint: "We show this rarely (no spam).",
        };
  }, [locale]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Frequency cap
    try {
      const key = "bridgeatlas_support_nudge_v1";
      const lastStr = localStorage.getItem(key);
      const last = lastStr ? Number(lastStr) : 0;

      // Show at most once per 7 days
      if (last && now() - last < days(7)) return;

      // Delay to avoid immediate annoyance
      const timer = window.setTimeout(() => {
        setOpen(true);
        localStorage.setItem(key, String(now()));
      }, 12_000);

      return () => window.clearTimeout(timer);
    } catch {
      // If storage blocked, just don't show.
      return;
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center p-4">
        <div className="w-full sm:max-w-md rounded-[28px] bg-white/75 border border-black/10 shadow-paper overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-semibold tracking-wide text-ink/60">
              BRIDGEATLAS
            </div>
            <div className="mt-2 text-xl font-extrabold tracking-tight text-ink">
              {t.heading}
            </div>
            <p className="mt-3 text-sm text-ink/70 leading-6">{t.body}</p>

            <div className="mt-4 text-[11px] text-ink/50">{t.hint}</div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/70 border border-black/10 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white transition"
              >
                {t.secondary}
              </button>
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold hover:bg-accentDeep transition"
                onClick={() => setOpen(false)}
              >
                {t.primary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
