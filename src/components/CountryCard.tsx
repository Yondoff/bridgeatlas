"use client";

import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { Bridge } from "@/lib/bridges";

function countryFromBridgeCountry(country: string): string[] {
  // crude name matching for our small dataset (can be improved later)
  if (country === "Denmark / Sweden") return ["Denmark", "Sweden"];
  return [country];
}

export default function CountryCard(props: { bridge: Bridge }) {
  const targets = countryFromBridgeCountry(props.bridge.country);

  const w: any = world as any;
  const countries = feature(w, w.objects.countries) as any;

  // Match by 'name' property (world-atlas uses English names)
  const shapes = countries.features.filter((f: any) =>
    targets.includes(f?.properties?.name)
  );

  // Fit projection to our selected shapes (fallback to world)
  const projection = geoMercator();
  const path = geoPath(projection);

  try {
    if (shapes.length) {
      projection.fitExtent(
        [
          [10, 10],
          [190, 140],
        ],
        { type: "FeatureCollection", features: shapes } as any
      );
    } else {
      projection.scale(30).translate([100, 75]);
    }
  } catch {
    projection.scale(30).translate([100, 75]);
  }

  const countryLabel = props.bridge.country.toUpperCase();
  const cityLabel = (props.bridge.city ?? "").toUpperCase();

  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 overflow-hidden">
      <div className="grid grid-cols-[210px_1fr] gap-0">
        {/* left: blank border-only country map */}
        <div className="p-4">
          <div className="rounded-[20px] bg-white/35 border border-black/10 overflow-hidden">
            <svg viewBox="0 0 200 150" className="h-[150px] w-[200px]">
              {/* subtle paper */}
              <rect width="200" height="150" fill="rgba(255,255,255,0.25)" />

              {shapes.length ? (
                shapes.map((f: any, i: number) => (
                  <path
                    key={i}
                    d={path(f) || undefined}
                    fill="transparent"
                    stroke="rgba(181,95,29,0.55)"
                    strokeWidth={1.1}
                  />
                ))
              ) : (
                <g>
                  {countries.features.slice(0, 1).map((f: any, i: number) => (
                    <path
                      key={i}
                      d={path(f) || undefined}
                      fill="transparent"
                      stroke="rgba(181,95,29,0.35)"
                      strokeWidth={0.9}
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* right: country + city labels */}
        <div className="p-6 flex flex-col justify-center">
          <div className="text-xs font-semibold text-ink/60 tracking-wide">
            COUNTRY
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-accent">
            {countryLabel}
          </div>
          {cityLabel ? (
            <div className="mt-1 text-sm font-semibold text-ink/60 tracking-wide">
              CITY
            </div>
          ) : null}
          {cityLabel ? (
            <div className="mt-1 text-lg tracking-tight text-ink/75">
              {cityLabel}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
