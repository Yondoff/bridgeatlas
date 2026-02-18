"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import WelcomeMark from "@/components/WelcomeMark";

type FeaturedBridge = {
  slug: string;
  name: string;
  country: string;
  city?: string;
  tagline: string;
  photo?: { url: string; caption?: string; credit?: string; sourceUrl?: string };
};

export default function HomeClient(
  props: { locale?: "en" | "fr" | "de"; featured?: FeaturedBridge[] } = {}
) {
  const locale = props.locale ?? "en";
  const isFR = locale === "fr";
  const isDE = locale === "de";
  const base = isFR ? "/fr" : isDE ? "/de" : "";

  const t = isFR
    ? {
        title: "L’atlas d’ingénierie des plus grands ponts du monde.",
        subtitle:
          "Fiches de ponts avec specs, sources et vraies explications — plus des classements et des leçons evergreen.",
        ctaMap: "Explorer la carte",
        ctaBridges: "Voir les ponts",
        ctaRankings: "Classements",
        ctaLearn: "Apprendre",
        featured: "Ponts à voir",
        featuredHint: "Clique un pont. Lis l’histoire. Enchaîne.",
        boxTitle: "Ce que tu vas avoir",
        bullets: [
          "• Fiches ponts : specs, sources, contexte de design",
          "• Classements construits sur la demande Google",
          "• Pages Learn pour comprendre comment ça marche",
        ],
        keepGoing: "Continue",
        keepGoingDesc:
          "Si tu ne sais pas quoi lire : commence par un classement, puis une page Learn.",
        linkLongest: "Classement : les ponts les plus longs",
        linkSuspension: "Learn : comment marche un pont suspendu",
        linkCompare: "Parcourir tous les ponts",
        tip: "Astuce : commence par un pont, puis clique dans les sources et la carte.",
      }
    : isDE
      ? {
          title: "Der Ingenieur‑Atlas der größten Brücken der Welt.",
          subtitle:
            "Brückenprofile mit Daten, Quellen und echten Erklärungen — plus Rankings und Learn‑Seiten.",
          ctaMap: "Weltkarte öffnen",
          ctaBridges: "Brücken ansehen",
          ctaRankings: "Rankings",
          ctaLearn: "Lernen",
          featured: "Highlights",
          featuredHint: "Klick eine Brücke. Lies die Story. Weiterklicken.",
          boxTitle: "Was du bekommst",
          bullets: [
            "• Brückenprofile: Daten, Quellen, Design‑Kontext",
            "• Rankings nach echter Suchnachfrage",
            "• Learn‑Seiten, die erklären wie Brücken funktionieren",
          ],
          keepGoing: "Weiter",
          keepGoingDesc:
            "Wenn du nicht weißt, was als Nächstes: erst ein Ranking, dann eine Learn‑Seite.",
          linkLongest: "Ranking: längste Brücken",
          linkSuspension: "Learn: wie Hängebrücken funktionieren",
          linkCompare: "Alle Brücken",
          tip: "Tipp: starte mit einer Brücke und folge dann Quellen und Karte.",
        }
      : {
          title: "The engineering atlas of the world’s greatest bridges.",
          subtitle:
            "Bridge profiles with specs, sources, and real explanations — plus rankings and evergreen lessons.",
          ctaMap: "Explore the world map",
          ctaBridges: "Browse bridges",
          ctaRankings: "Rankings",
          ctaLearn: "Learn",
          featured: "Featured bridges",
          featuredHint: "Click one. Read the story. Keep going.",
          boxTitle: "What you’ll get",
          bullets: [
            "• Bridge profiles: specs, sources, and design context",
            "• Rankings built around real search demand",
            "• Learn pages that explain how bridges actually work",
          ],
          keepGoing: "Keep going",
          keepGoingDesc:
            "If you don’t know what to read next: open a ranking, then a Learn page.",
          linkLongest: "Ranking: longest bridges",
          linkSuspension: "Learn: how suspension bridges work",
          linkCompare: "Browse all bridges",
          tip: "Tip: start with a bridge, then follow the sources and the map.",
        };

  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-7"
          >
            <WelcomeMark />
          </motion.div>

          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink/60">
                BRIDGEATLAS
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
                {t.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-7 text-ink/70 max-w-xl">
                {t.subtitle}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${base}/map`}
                  className="rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold hover:bg-accentDeep transition"
                >
                  {t.ctaMap}
                </Link>
                <Link
                  href={`${base}/bridges`}
                  className="rounded-full bg-white/70 border border-black/10 px-6 py-3 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  {t.ctaBridges}
                </Link>
                <Link
                  href={`${base}/rankings`}
                  className="rounded-full bg-white/70 border border-black/10 px-6 py-3 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  {t.ctaRankings}
                </Link>
                <Link
                  href={`${base}/learn`}
                  className="rounded-full bg-white/70 border border-black/10 px-6 py-3 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  {t.ctaLearn}
                </Link>
              </div>
            </div>

            <div className="w-full sm:w-[320px]">
              <div className="rounded-[32px] bg-paper/80 border border-black/10 p-5">
                <div className="text-sm font-semibold">{t.boxTitle}</div>
                <ul className="mt-3 space-y-2 text-sm text-ink/70">
                  {t.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {props.featured?.length ? (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs font-semibold text-ink/60 tracking-wide">
                  {t.featured.toUpperCase()}
                </div>
                <div className="mt-2 text-sm text-ink/70">{t.featuredHint}</div>
              </div>
              <Link
                href={`${base}/bridges`}
                className="text-sm font-semibold text-accent hover:text-accentDeep transition"
              >
                {t.linkCompare} →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {props.featured.slice(0, 6).map((b) => (
                <Link
                  key={b.slug}
                  href={`${base}/bridges/${b.slug}`}
                  className="group rounded-[28px] bg-white/60 border border-black/10 shadow-paper hover:bg-white/70 transition overflow-hidden"
                >
                  <div className="relative h-[160px] bg-paper/70">
                    {b.photo?.url ? (
                      <>
                        <Image
                          src={b.photo.url}
                          alt={b.photo.caption ?? `${b.name} photo`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 420px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                      </>
                    ) : null}
                    <div className="absolute left-4 bottom-3 right-4">
                      <div className="text-white/95 font-extrabold leading-tight">
                        {b.name}
                      </div>
                      <div className="text-[12px] text-white/80 font-semibold">
                        {b.city ? `${b.city}, ` : ""}{b.country}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <div className="text-sm text-ink/75 leading-6">
                      <span className="font-semibold">
                        {isFR ? "Pourquoi :" : isDE ? "Warum:" : "Why:"}
                      </span>{" "}
                      {b.tagline}
                    </div>
                    <div className="mt-3 text-xs text-ink/55 flex items-center justify-between">
                      <span>{isFR ? "Ouvrir" : isDE ? "Öffnen" : "Open"}</span>
                      <span className="font-semibold text-accent group-hover:text-accentDeep transition">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] bg-paper/70 border border-black/10 p-6">
              <div className="text-sm font-semibold">{t.keepGoing}</div>
              <p className="mt-2 text-sm text-ink/70 max-w-2xl leading-6">
                {t.keepGoingDesc}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${base}/rankings/longest-bridges`}
                  className="rounded-full bg-white/70 border border-black/10 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  {t.linkLongest}
                </Link>
                <Link
                  href={`${base}/learn/how-suspension-bridges-work`}
                  className="rounded-full bg-white/70 border border-black/10 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  {t.linkSuspension}
                </Link>
                <Link
                  href={`${base}/map`}
                  className="rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold hover:bg-accentDeep transition"
                >
                  {t.ctaMap}
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-xs text-ink/50">{t.tip}</div>
      </main>
    </div>
  );
}
