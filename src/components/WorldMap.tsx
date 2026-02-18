"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { Bridge } from "@/lib/bridges";

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function WorldMap(props: {
  bridges: Bridge[];
  onSelect?: (slug: string) => void;
  className?: string;
}) {
  const [hover, setHover] = useState<Bridge | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const countries = useMemo(() => {
    const w: any = world as any;
    return feature(w, w.objects.countries) as any;
  }, []);

  const { projection, path } = useMemo(() => {
    const baseScale = 165;
    const baseTranslate: [number, number] = [420, 210];
    const projection = geoNaturalEarth1()
      .scale(baseScale * zoom)
      .translate([baseTranslate[0] + pan.x, baseTranslate[1] + pan.y]);
    const path = geoPath(projection);
    return { projection, path };
  }, [zoom, pan.x, pan.y]);

  return (
    <div
      className={classNames(
        "relative rounded-[44px] bg-white/55 border border-black/10 shadow-paper overflow-hidden",
        props.className
      )}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-semibold text-ink/60">WORLD MAP</div>
            <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              Pick a bridge
            </div>
            <div className="mt-3 text-sm text-ink/70 max-w-xl">
              Click a marker to open the bridge profile.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-full bg-white/70 border border-black/10 px-3 py-1 text-xs font-semibold hover:bg-white transition"
              onClick={() => setZoom((z) => Math.min(2.8, Number((z + 0.2).toFixed(2))))}
              type="button"
            >
              Zoom +
            </button>
            <button
              className="rounded-full bg-white/70 border border-black/10 px-3 py-1 text-xs font-semibold hover:bg-white transition"
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))}
              type="button"
            >
              Zoom −
            </button>
            <button
              className="rounded-full bg-white/70 border border-black/10 px-3 py-1 text-xs font-semibold hover:bg-white transition"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              type="button"
            >
              Reset
            </button>

            {hover ? (
              <div className="ml-2 rounded-[28px] bg-paper/70 border border-black/10 px-4 py-3 text-sm">
                <div className="font-semibold">{hover.name}</div>
                <div className="text-ink/60 text-xs mt-0.5">
                  {hover.city ? `${hover.city}, ` : ""}{hover.country}
                </div>
              </div>
            ) : (
              <div className="ml-2 text-xs text-ink/50">Hover a marker</div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-[36px] bg-paper/65 border border-black/10 overflow-hidden">
          <svg
            viewBox="0 0 840 420"
            className={classNames(
              "h-[320px] w-full",
              dragging ? "cursor-grabbing" : "cursor-grab"
            )}
            onWheel={(e) => {
              e.preventDefault();
              const delta = Math.sign(e.deltaY);
              setZoom((z) => {
                const next = z + (delta > 0 ? -0.12 : 0.12);
                return Math.max(1, Math.min(2.8, Number(next.toFixed(2))));
              });
            }}
          >
            {/* background drag layer (so markers stay clickable) */}
            <rect
              x="0"
              y="0"
              width="840"
              height="420"
              fill="transparent"
              onPointerDown={(e) => {
                (e.currentTarget as any).setPointerCapture?.(e.pointerId);
                setDragging(true);
                const startX = e.clientX;
                const startY = e.clientY;
                const startPan = { ...pan };

                const onMove = (ev: PointerEvent) => {
                  setPan({
                    x: startPan.x + (ev.clientX - startX),
                    y: startPan.y + (ev.clientY - startY),
                  });
                };
                const onUp = () => {
                  setDragging(false);
                  window.removeEventListener("pointermove", onMove);
                  window.removeEventListener("pointerup", onUp);
                };
                window.addEventListener("pointermove", onMove);
                window.addEventListener("pointerup", onUp);
              }}
            />
            {/* countries */}
            <g>
              {countries.features.map((f: any, i: number) => (
                <path
                  key={i}
                  d={path(f) || undefined}
                  fill="rgba(255,255,255,0.45)"
                  stroke="rgba(31,35,40,0.12)"
                  strokeWidth={0.6}
                />
              ))}
            </g>

            {/* markers */}
            <g>
              {props.bridges.map((b) => {
                const p = projection([b.coordinates.lon, b.coordinates.lat]);
                if (!p) return null;
                const [x, y] = p;
                return (
                  <g
                    key={b.slug}
                    transform={`translate(${x},${y})`}
                    onMouseEnter={() => setHover(b)}
                    onMouseLeave={() => setHover(null)}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onSelect?.(b.slug);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <circle r={7} fill="rgba(217,118,39,0.22)" />
                    <circle r={3.5} fill="rgba(217,118,39,0.85)" />
                    <circle r={11} fill="transparent" />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="mt-4 text-xs text-ink/50">
          Drag to move • Wheel or buttons to zoom • Click a marker to open.
        </div>
      </div>
    </div>
  );
}
