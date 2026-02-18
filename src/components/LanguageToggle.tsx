"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function withPrefix(pathname: string, prefix: "" | "/fr" | "/de") {
  // normalize to EN path first
  let p = pathname;
  if (p === "/fr") p = "/";
  if (p.startsWith("/fr/")) p = p.replace(/^\/fr/, "");
  if (p === "/de") p = "/";
  if (p.startsWith("/de/")) p = p.replace(/^\/de/, "");

  if (prefix === "") return p;
  if (p === "/") return prefix;
  return `${prefix}${p}`;
}

export default function LanguageToggle() {
  const pathname = usePathname() || "/";
  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");
  const isDE = pathname === "/de" || pathname.startsWith("/de/");

  const enHref = withPrefix(pathname, "");
  const frHref = withPrefix(pathname, "/fr");
  const deHref = withPrefix(pathname, "/de");

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="rounded-full bg-white/70 border border-black/10 shadow-paper px-2 py-2 backdrop-blur flex items-center gap-1">
        <Link
          href={enHref}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            !isFR && !isDE
              ? "bg-accent text-white"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          EN
        </Link>
        <Link
          href={frHref}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            isFR ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
          }`}
        >
          FR
        </Link>
        <Link
          href={deHref}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            isDE ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
          }`}
        >
          DE
        </Link>
      </div>
    </div>
  );
}
