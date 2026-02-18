"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { localeFromPathname, withLocalePrefix } from "@/lib/locale";

const LANGS = [
  { code: "en", label: "EN", base: "" },
  { code: "fr", label: "FR", base: "/fr" },
  { code: "de", label: "DE", base: "/de" },
  { code: "es", label: "ES", base: "/es" },
  { code: "ru", label: "RU", base: "/ru" },
  { code: "ja", label: "JA", base: "/ja" },
] as const;

export default function LanguageToggle() {
  const pathname = usePathname() || "/";
  const { locale } = localeFromPathname(pathname);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="rounded-full bg-white/70 border border-black/10 shadow-paper px-2 py-2 backdrop-blur flex items-center gap-1">
        {LANGS.map((l) => {
          const href = withLocalePrefix(pathname, l.base);
          const active = locale === l.code;
          return (
            <Link
              key={l.code}
              href={href}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
