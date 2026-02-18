"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/locale";

function withBase(base: string, href: string) {
  if (href === "/") return base || "/";
  return `${base}${href}`;
}

const SUPPORT_URL = "https://ko-fi.com/bridgeatlas";

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  const { locale, base } = localeFromPathname(pathname);

  const t =
    locale === "fr"
      ? {
          desc:
            "Un projet indépendant : un atlas d’ingénierie des plus grands ponts du monde. Non affilié à une institution.",
          links: "LIENS",
          home: "Accueil",
          bridges: "Ponts",
          rankings: "Classements",
          learn: "Apprendre",
          map: "Carte",
          support: "Soutenir",
          credits:
            "Les crédits photos et les sources sont indiqués sur les pages pont.",
          independent: "Projet indépendant",
          affiliate:
            "Certains liens peuvent être des liens d’affiliation. Nous pouvons toucher une commission, sans coût supplémentaire pour vous.",
        }
      : {
          desc:
            "An independent project: a curated engineering atlas of the world’s greatest bridges. Not affiliated with any institution.",
          links: "LINKS",
          home: "Home",
          bridges: "Bridges",
          rankings: "Rankings",
          learn: "Learn",
          map: "Map",
          support: "Support",
          credits: "Photos & data credits are shown on each bridge page.",
          independent: "Independent project",
          affiliate:
            "Some links may be affiliate links. We may earn a commission at no additional cost to you.",
        };

  return (
    <footer className="border-t border-black/10 bg-paper/60">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-extrabold tracking-tight text-ink">BridgeAtlas</div>
            <p className="mt-2 text-sm text-ink/70 leading-6 max-w-md">{t.desc}</p>
          </div>

          <div className="sm:text-right">
            <div className="text-xs font-semibold tracking-wide text-ink/60">{t.links}</div>
            <div className="mt-3 flex sm:justify-end flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link className="text-accent font-semibold hover:text-accentDeep" href={withBase(base, "/")}>
                {t.home}
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href={withBase(base, "/bridges")}>
                {t.bridges}
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href={withBase(base, "/rankings")}>
                {t.rankings}
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href={withBase(base, "/learn")}>
                {t.learn}
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href={withBase(base, "/map")}>
                {t.map}
              </Link>
              <a
                className="text-accent font-semibold hover:text-accentDeep"
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.support}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-ink/55">
          <div>
            © {new Date().getFullYear()} BridgeAtlas • {t.independent}
          </div>
          <div>{t.credits}</div>
        </div>

        <div className="mt-3 text-[11px] text-ink/50 leading-5">{t.affiliate}</div>
      </div>
    </footer>
  );
}
