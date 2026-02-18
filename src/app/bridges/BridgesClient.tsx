"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BridgeIllustration from "@/components/BridgeIllustration";
import BridgeCroquis, { hasCroquis } from "@/components/BridgeCroquis";
import FlagBadge from "@/components/FlagBadge";
import SortBar, { type SortKey } from "@/components/SortBar";
import { flagsForCountry } from "@/lib/flags";
import { parseLengthMeters } from "@/lib/length";
import type { Bridge } from "@/lib/bridges";

function prettyType(t: string) {
  return t
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export default function BridgesClient(props: { bridges: Bridge[] }) {
  const [query, setQuery] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("name");
  const [previewMode, setPreviewMode] = useState<"photos" | "illustrations">("photos");

  const countries = useMemo(() => {
    return Array.from(new Set(props.bridges.map((b) => b.country))).sort();
  }, [props.bridges]);

  const types = useMemo(() => {
    return Array.from(new Set(props.bridges.map((b) => b.type))).sort();
  }, [props.bridges]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = props.bridges.slice();

    if (country) list = list.filter((b) => b.country === country);
    if (type) list = list.filter((b) => b.type === type);

    if (q) {
      list = list.filter((b) => {
        const hay = `${b.name} ${b.country} ${b.city ?? ""} ${b.tagline}`.toLowerCase();
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "country") return a.country.localeCompare(b.country);
      if (sort === "newest") return (b.yearOpened ?? -1) - (a.yearOpened ?? -1);
      if (sort === "oldest") return (a.yearOpened ?? 10**9) - (b.yearOpened ?? 10**9);
      if (sort === "length") {
        const la = parseLengthMeters(a.length) ?? -1;
        const lb = parseLengthMeters(b.length) ?? -1;
        return lb - la;
      }
      return 0;
    });

    return list;
  }, [props.bridges, query, country, type, sort]);

  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-semibold text-ink/60">GALLERY</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Bridges
            </h1>
            <p className="mt-3 text-sm text-ink/70 max-w-xl">
              Curated picks with <span className="font-semibold">simple engineering</span> breakdowns.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-white/70 border border-black/10 hover:bg-white transition"
          >
            Home
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <SortBar
            query={query}
            setQuery={setQuery}
            type={type}
            setType={setType}
            country={country}
            setCountry={setCountry}
            sort={sort}
            setSort={setSort}
            countries={countries}
            types={types}
          />

          <div className="rounded-full bg-white/70 border border-black/10 p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPreviewMode("photos")}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                previewMode === "photos" ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              Photos
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("illustrations")}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                previewMode === "illustrations" ? "bg-accent text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              Illustrations
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((b) => (
            <Link
              key={b.slug}
              href={`/bridges/${b.slug}`}
              className="group rounded-[36px] bg-white/60 border border-black/10 shadow-paper hover:bg-white/70 transition overflow-hidden"
            >
              <div className="relative">
                {b.photo?.url ? (
                  <div className="relative h-[220px] bg-paper/70">
                    <Image
                      src={b.photo.url}
                      alt={b.photo.caption ?? `${b.name} photo`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

                    {(b.photo.credit || b.photo.sourceUrl) ? (
                      <div className="absolute left-4 bottom-3 text-[11px] text-white/90">
                        <span className="font-semibold">{b.photo.credit ?? "Photo"}</span>
                        {b.photo.sourceUrl ? (
                          <>
                            <span className="text-white/70"> • </span>
                            <a
                              href={b.photo.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-white/40 hover:decoration-white/80"
                              onClick={(e) => e.stopPropagation()}
                            >
                              source
                            </a>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : hasCroquis(b.slug) ? (
                  <BridgeCroquis
                    slug={b.slug}
                    className="rounded-none border-0 bg-paper/70"
                  />
                ) : (
                  <BridgeIllustration
                    slug={b.slug}
                    type={b.type}
                    className="rounded-none border-0 bg-paper/70"
                  />
                )}

                {(() => {
                  const codes = flagsForCountry(b.country);
                  if (!codes.length) return null;
                  return (
                    <FlagBadge
                      codes={codes}
                      className="absolute right-3 top-3"
                    />
                  );
                })()}
              </div>

              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-ink group-hover:translate-x-0.5 transition">
                      {b.name}
                    </div>
                    <div className="mt-1 text-sm text-ink/60">
                      <span className="font-semibold text-ink/70">
                        {b.city ? `${b.city}, ` : ""}
                        {b.country}
                      </span>
                      {b.yearOpened ? (
                        <span className="ml-2 text-ink/45">
                          • opened <span className="font-semibold">{b.yearOpened}</span>
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm text-ink/55">
                      <span className="font-semibold">Length:</span> {b.length}
                    </div>
                  </div>
                  <div className="rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold">
                    {prettyType(b.type)}
                  </div>
                </div>

                <div className="mt-4 text-sm text-ink/75 leading-6">
                  <span className="font-semibold">Why it matters:</span> {b.tagline}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-ink/50">Tap to open</div>
                  <div className="text-sm font-semibold text-accent group-hover:text-accentDeep transition">
                    Open →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-xs text-ink/50">
          Showing {filtered.length} bridges.
        </div>
      </main>
    </div>
  );
}
