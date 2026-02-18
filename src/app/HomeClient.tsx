"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WelcomeMark from "@/components/WelcomeMark";

export default function HomeClient(props: { locale?: "en" | "fr" } = {}) {
  const locale = props.locale ?? "en";
  const isFR = locale === "fr";
  const base = isFR ? "/fr" : "";

  const t = isFR
    ? {
        title: "L’atlas d’ingénierie des plus grands ponts du monde.",
        subtitle:
          "Fiches de ponts avec specs, sources et vraies explications — plus des classements et des leçons evergreen.",
        ctaMap: "Explorer la carte",
        ctaBridges: "Voir les ponts",
        ctaRankings: "Classements",
        ctaLearn: "Apprendre",
        boxTitle: "Ce que tu vas avoir",
        bullets: [
          "• Fiches ponts : specs, sources, contexte de design",
          "• Classements construits sur la demande Google",
          "• Pages Learn pour comprendre comment ça marche",
        ],
        tip: "Astuce : commence par la carte, puis ouvre une fiche pont.",
      }
    : {
        title: "The engineering atlas of the world’s greatest bridges.",
        subtitle:
          "Bridge profiles with specs, sources, and real explanations — plus rankings and evergreen lessons.",
        ctaMap: "Explore the world map",
        ctaBridges: "Browse bridges",
        ctaRankings: "Rankings",
        ctaLearn: "Learn",
        boxTitle: "What you’ll get",
        bullets: [
          "• Bridge profiles: specs, sources, and design context",
          "• Rankings built around real search demand",
          "• Learn pages that explain how bridges actually work",
        ],
        tip: "Tip: start with the map, then open a bridge profile.",
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

        <div className="mt-10 text-xs text-ink/50">{t.tip}</div>
      </main>
    </div>
  );
}
