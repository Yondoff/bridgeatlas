"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function toFrenchPath(pathname: string) {
  if (pathname === "/") return "/fr";
  if (pathname.startsWith("/fr")) return pathname;
  return `/fr${pathname}`;
}

function toEnglishPath(pathname: string) {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.replace(/^\/fr/, "");
  return pathname;
}

export default function LanguageToggle() {
  const pathname = usePathname() || "/";
  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");

  const enHref = toEnglishPath(pathname);
  const frHref = toFrenchPath(pathname);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="rounded-full bg-white/70 border border-black/10 shadow-paper px-2 py-2 backdrop-blur flex items-center gap-1">
        <Link
          href={enHref}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            !isFR ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
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
      </div>
    </div>
  );
}
