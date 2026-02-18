"use client";

import { useMemo } from "react";

export type SortKey =
  | "name"
  | "country"
  | "length"
  | "newest"
  | "oldest";

export default function SortBar(props: {
  query: string;
  setQuery: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  countries: string[];
  types: string[];
}) {
  const options = useMemo(
    () => [
      { value: "name", label: "Name" },
      { value: "country", label: "Country" },
      { value: "length", label: "Length" },
      { value: "newest", label: "Most recent" },
      { value: "oldest", label: "Oldest" },
    ] as Array<{ value: SortKey; label: string }>,
    []
  );

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="text-xs font-semibold text-ink/60 tracking-wide">
            SEARCH
          </div>
          <input
            value={props.query}
            onChange={(e) => props.setQuery(e.target.value)}
            placeholder="Search bridges, cities, countries…"
            className="w-full sm:w-[360px] rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm font-semibold text-ink/80 outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div className="flex gap-2 items-center">
          <div className="text-xs font-semibold text-ink/60 tracking-wide">
            SORT
          </div>
          <select
            value={props.sort}
            onChange={(e) => props.setSort(e.target.value as SortKey)}
            className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-accent/30"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex gap-2 items-center">
          <div className="text-xs font-semibold text-ink/60 tracking-wide">
            COUNTRY
          </div>
          <select
            value={props.country}
            onChange={(e) => props.setCountry(e.target.value)}
            className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">All countries</option>
            {props.countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <div className="text-xs font-semibold text-ink/60 tracking-wide">
            TYPE
          </div>
          <select
            value={props.type}
            onChange={(e) => props.setType(e.target.value)}
            className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">All types</option>
            {props.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
