"use client";

import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { Bridge } from "@/lib/bridges";

function targetNames(country: string): string[] {
  // Keep it small and explicit for now.
  if (country === "Denmark / Sweden") return ["Denmark", "Sweden"];
  if (country === "United States") return ["United States of America", "United States"];
  return [country];
}

export default function CountryBackdrop(props: { bridge: Bridge }) {
  const b = props.bridge;
  const wanted = targetNames(b.country);

  const { shapes, neighbors, projection, path } = useMemo(() => {
    const w: any = world as any;
    const countries = feature(w, w.objects.countries) as any;

    const shapes = countries.features.filter((f: any) =>
      wanted.includes(f?.properties?.name)
    );

    const projection = geoMercator();
    const path = geoPath(projection);

    // Fit to country shapes into a tall left panel.
    try {
      if (shapes.length) {
        projection.fitExtent(
          [
            [24, 24],
            [520, 820],
          ],
          { type: "FeatureCollection", features: shapes } as any
        );
      } else {
        projection.scale(120).translate([260, 420]);
      }
    } catch {
      projection.scale(120).translate([260, 420]);
    }

    // Pick “neighbor” shapes by bbox proximity in projected space.
    const bounds = shapes.length
      ? shapes
          .map((f: any) => path.bounds(f))
          .reduce(
            (acc: any, b: any) => [
              [Math.min(acc[0][0], b[0][0]), Math.min(acc[0][1], b[0][1])],
              [Math.max(acc[1][0], b[1][0]), Math.max(acc[1][1], b[1][1])],
            ],
            [
              [Infinity, Infinity],
              [-Infinity, -Infinity],
            ]
          )
      : [
          [0, 0],
          [540, 900],
        ];

    const pad = 120;
    const minX = bounds[0][0] - pad;
    const minY = bounds[0][1] - pad;
    const maxX = bounds[1][0] + pad;
    const maxY = bounds[1][1] + pad;

    const neighbors = countries.features
      .filter((f: any) => !wanted.includes(f?.properties?.name))
      .filter((f: any) => {
        const c = path.centroid(f);
        if (!c || !isFinite(c[0]) || !isFinite(c[1])) return false;
        return c[0] >= minX && c[0] <= maxX && c[1] >= minY && c[1] <= maxY;
      })
      .slice(0, 18);

    return { shapes, neighbors, projection, path };
  }, [b.country]);

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-[36%] hidden lg:block">
      <div className="absolute inset-0">
        <svg viewBox="0 0 560 900" className="h-full w-full">
          <defs>
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </defs>

          {/* neighbors (blurred / faint) */}
          <g filter="url(#softBlur)" opacity="0.22">
            {neighbors.map((f: any, i: number) => (
              <path
                key={i}
                d={path(f) || undefined}
                fill="transparent"
                stroke="rgba(181,95,29,0.85)"
                strokeWidth={1.0}
              />
            ))}
          </g>

          {/* main country outline */}
          <g opacity="0.55">
            {shapes.map((f: any, i: number) => (
              <path
                key={i}
                d={path(f) || undefined}
                fill="transparent"
                stroke="rgba(181,95,29,0.95)"
                strokeWidth={1.6}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
