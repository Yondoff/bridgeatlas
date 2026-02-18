"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Bridge } from "@/lib/bridges";
import BridgeHero from "@/components/BridgeHero";
import Disclosure from "@/components/Disclosure";
import FlagBadge from "@/components/FlagBadge";
import { flagsForCountry } from "@/lib/flags";
import PhotoCard from "@/components/PhotoCard";
import Glossary from "@/components/Glossary";
import ProfileSheet from "@/components/ProfileSheet";
import BridgeMiniMap from "@/components/BridgeMiniMap";
import CountryBackdrop from "@/components/CountryBackdrop";
import CountryLabelRight from "@/components/CountryLabelRight";
import ShareButton from "@/components/ShareButton";
import RecommendedReading from "@/components/RecommendedReading";
import { usePathname } from "next/navigation";

export default function BridgeDetailClient(props: { bridge: Bridge }) {
  const b = props.bridge;
  const pathname = usePathname() || "/";
  const isFR = pathname === "/fr" || pathname.startsWith("/fr/");
  const base = isFR ? "/fr" : "";
  const t = isFR
    ? {
        back: "← Retour",
        overview: "Aperçu",
        why: "Pourquoi c’est important :",
        funFact: "Fait fun",
        records: "RECORDS",
        quickFacts: "Chiffres clés",
        sources: "Sources",
        breakdown: "Décryptage ingénierie",
      }
    : {
        back: "← Back",
        overview: "Overview",
        why: "Why it matters:",
        funFact: "Fun fact",
        records: "RECORDS",
        quickFacts: "Quick facts",
        sources: "Sources",
        breakdown: "Engineering breakdown",
      };
  return (
    <div className="min-h-dvh relative">
      <CountryBackdrop bridge={b} />
      <CountryLabelRight bridge={b} />
      <main className="mx-auto max-w-4xl px-6 py-16 relative">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <Link
            href={`${base}/bridges`}
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-white/70 border border-black/10 hover:bg-white transition"
          >
            {t.back}
          </Link>

          <ShareButton title={b.name} path={`${base}/bridges/${b.slug}`} />
        </div>

        <div className="relative">
          <BridgeHero
            slug={b.slug}
            type={b.type}
            name={b.name}
            subtitle={`${b.city ? `${b.city}, ` : ""}${b.country}`}
          />
          {(() => {
            const codes = flagsForCountry(b.country);
            if (!codes.length) return null;
            return (
              <FlagBadge
                codes={codes}
                className="absolute right-6 top-6"
              />
            );
          })()}
        </div>

        {b.photo ? (
          <div className="mt-8">
            <PhotoCard
              url={b.photo.url}
              caption={b.photo.caption ?? b.name}
              credit={b.photo.credit}
              sourceUrl={b.photo.sourceUrl}
            />
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="mt-8"
        >
          <ProfileSheet bridge={b} locale={isFR ? "fr" : "en"}>
            <div>
              <div className="text-lg font-semibold">{t.overview}</div>
              <p className="mt-3 text-sm text-ink/75 leading-7">{b.intro}</p>
              <p className="mt-4 text-sm text-ink/75 leading-7">
                <span className="font-semibold">{t.why}</span> {b.tagline}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <BridgeMiniMap bridge={b} />
              </div>
              <div className="rounded-[28px] bg-paper/70 border border-black/10 p-5">
                <div className="text-sm font-semibold">{t.funFact}</div>
                <p className="mt-3 text-sm text-ink/75 leading-7">{b.funFact}</p>
                {b.records?.length ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-ink/60 tracking-wide">
                      {t.records}
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-ink/75 leading-7">
                      {b.records.slice(0, 3).map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="rounded-[28px] bg-paper/70 border border-black/10 p-5">
                <div className="text-sm font-semibold">{t.quickFacts}</div>
                <div className="mt-3 space-y-2 text-sm text-ink/70">
                  {b.quickFacts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-4">
                      <div className="text-ink/60">{f.label}</div>
                      <div className="font-semibold text-ink">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 rounded-[28px] bg-paper/70 border border-black/10 p-5">
                <div className="text-sm font-semibold">{t.sources}</div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {b.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:text-accentDeep font-semibold"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Disclosure title={t.breakdown} defaultOpen={false}>
              <ul className="space-y-2 text-sm text-ink/75 leading-7">
                {b.engineeringBreakdown.map((x, i) => (
                  <li key={i}>• {x}</li>
                ))}
              </ul>
            </Disclosure>

            <Glossary bridge={b} />

            <div className="pt-2">
              <RecommendedReading bridge={b} />
            </div>
          </ProfileSheet>
        </motion.div>
      </main>
    </div>
  );
}
