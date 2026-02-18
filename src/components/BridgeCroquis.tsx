import React from "react";

// Bridge-specific croquis (simple line sketches) based on common reference photos.
// For 10 bridges we draw custom silhouettes; others fall back to generic type illustration.

export function hasCroquis(slug: string): boolean {
  return [
    "golden-gate-bridge",
    "brooklyn-bridge",
    "tower-bridge",
    "sydney-harbour-bridge",
    "akashi-kaikyo-bridge",
    "oresund-bridge",
    "millau-viaduct",
    "charles-bridge",
    "ponte-vecchio",
    "rialto-bridge",
  ].includes(slug);
}

export default function BridgeCroquis(props: {
  slug: string;
  className?: string;
}) {
  const { slug } = props;

  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const Frame = (children: React.ReactNode) => (
    <div
      className={
        props.className ??
        "relative overflow-hidden rounded-[28px] bg-paper/70 border border-black/10"
      }
      aria-hidden
    >
      <svg viewBox="0 0 560 220" className="h-[140px] w-full text-ink/70">
        {/* horizon */}
        <path d="M20 185H540" {...common} stroke="rgba(31,35,40,0.22)" />
        {children}
      </svg>
      <div className="absolute left-3 top-3 rounded-full bg-white/65 border border-black/10 px-3 py-1 text-[11px] font-semibold text-ink/70">
        Croquis
      </div>
    </div>
  );

  switch (slug) {
    case "golden-gate-bridge":
      return Frame(
        <>
          {/* towers */}
          <path d="M165 185V52" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M395 185V52" {...common} stroke="rgba(31,35,40,0.55)" />
          {/* top cross beams */}
          <path d="M150 78H210" {...common} stroke="rgba(31,35,40,0.28)" />
          <path d="M350 78H410" {...common} stroke="rgba(31,35,40,0.28)" />
          {/* catenary-ish main cable */}
          <path
            d="M70 68 C160 -6, 400 -6, 490 68"
            {...common}
            stroke="rgba(217,118,39,0.82)"
          />
          {/* deck */}
          <path d="M55 160H505" {...common} stroke="rgba(31,35,40,0.60)" />
          {/* hangers */}
          {Array.from({ length: 13 }).map((_, i) => {
            const x = 110 + i * 28;
            const t = i / 12;
            const y = 68 - 28 * (1 - (2 * t - 1) ** 2);
            return (
              <path
                key={i}
                d={`M${x} ${y} V160`}
                {...common}
                stroke="rgba(31,35,40,0.30)"
              />
            );
          })}
          {/* hint of fog */}
          <path
            d="M40 176 C140 154, 230 192, 320 170 C410 148, 485 190, 520 168"
            {...common}
            stroke="rgba(31,35,40,0.10)"
          />
        </>
      );

    case "brooklyn-bridge":
      return Frame(
        <>
          {/* gothic-ish towers */}
          <path d="M170 185V58" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M390 185V58" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M150 58H190" {...common} stroke="rgba(31,35,40,0.45)" />
          <path d="M370 58H410" {...common} stroke="rgba(31,35,40,0.45)" />
          {/* arches */}
          <path
            d="M170 92 C170 74, 190 74, 190 92"
            {...common}
            stroke="rgba(31,35,40,0.35)"
          />
          <path
            d="M390 92 C390 74, 410 74, 410 92"
            {...common}
            stroke="rgba(31,35,40,0.35)"
          />
          {/* cables */}
          <path
            d="M85 78 C170 20, 390 20, 475 78"
            {...common}
            stroke="rgba(181,95,29,0.75)"
          />
          <path d="M55 160H505" {...common} stroke="rgba(31,35,40,0.60)" />
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 120 + i * 30;
            const t = i / 10;
            const y = 78 - 22 * (1 - (2 * t - 1) ** 2);
            return (
              <path
                key={i}
                d={`M${x} ${y} V160`}
                {...common}
                stroke="rgba(31,35,40,0.28)"
              />
            );
          })}
        </>
      );

    case "tower-bridge":
      return Frame(
        <>
          {/* towers */}
          <path d="M185 185V65" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M375 185V65" {...common} stroke="rgba(31,35,40,0.55)" />
          {/* roofs */}
          <path d="M170 65L185 48L200 65" {...common} stroke="rgba(31,35,40,0.45)" />
          <path d="M360 65L375 48L390 65" {...common} stroke="rgba(31,35,40,0.45)" />
          {/* upper walkway */}
          <path d="M200 82H360" {...common} stroke="rgba(31,35,40,0.40)" />
          {/* bascules */}
          <path d="M215 160H270" {...common} stroke="rgba(181,95,29,0.78)" />
          <path d="M290 160H345" {...common} stroke="rgba(181,95,29,0.78)" />
          {/* suspension side spans hint */}
          <path d="M80 120C130 95,160 95,185 120" {...common} stroke="rgba(31,35,40,0.25)" />
          <path d="M375 120C400 95,430 95,480 120" {...common} stroke="rgba(31,35,40,0.25)" />
        </>
      );

    case "sydney-harbour-bridge":
      return Frame(
        <>
          {/* big through arch */}
          <path
            d="M70 170 C120 70, 440 70, 490 170"
            {...common}
            stroke="rgba(31,35,40,0.65)"
          />
          {/* arch ribs */}
          <path
            d="M95 170 C140 88, 420 88, 465 170"
            {...common}
            stroke="rgba(31,35,40,0.30)"
          />
          {/* deck */}
          <path d="M60 170H500" {...common} stroke="rgba(181,95,29,0.78)" />
          {/* hangers */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 110 + i * 38;
            return (
              <path
                key={i}
                d={`M${x} 170 V145`}
                {...common}
                stroke="rgba(31,35,40,0.25)"
              />
            );
          })}
        </>
      );

    case "akashi-kaikyo-bridge":
      return Frame(
        <>
          <path d="M170 185V54" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M390 185V54" {...common} stroke="rgba(31,35,40,0.55)" />
          {/* very long span cable */}
          <path
            d="M40 70 C160 -10, 400 -10, 520 70"
            {...common}
            stroke="rgba(217,118,39,0.78)"
          />
          <path d="M35 162H525" {...common} stroke="rgba(31,35,40,0.60)" />
          {Array.from({ length: 15 }).map((_, i) => (
            <path
              key={i}
              d={`M${85 + i * 26} 90 V162`}
              {...common}
              stroke="rgba(31,35,40,0.22)"
            />
          ))}
        </>
      );

    case "oresund-bridge":
      return Frame(
        <>
          {/* cable-stayed pylons */}
          <path d="M240 185V58" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M320 185V58" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M55 160H505" {...common} stroke="rgba(31,35,40,0.60)" />
          {/* stays fan */}
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 95 + i * 55;
            return (
              <React.Fragment key={i}>
                <path
                  d={`M240 70 L${x} 160`}
                  {...common}
                  stroke="rgba(181,95,29,0.72)"
                />
                <path
                  d={`M320 70 L${560 - x} 160`}
                  {...common}
                  stroke="rgba(181,95,29,0.72)"
                />
              </React.Fragment>
            );
          })}
        </>
      );

    case "millau-viaduct":
      return Frame(
        <>
          {/* tall pylons */}
          <path d="M150 185V40" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M260 185V55" {...common} stroke="rgba(31,35,40,0.40)" />
          <path d="M370 185V55" {...common} stroke="rgba(31,35,40,0.40)" />
          <path d="M480 185V40" {...common} stroke="rgba(31,35,40,0.55)" />
          {/* deck */}
          <path d="M60 150H520" {...common} stroke="rgba(31,35,40,0.60)" />
          {/* stays */}
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M150 55 L${110 + i * 60} 150`}
              {...common}
              stroke="rgba(217,118,39,0.65)"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M480 55 L${440 - i * 60} 150`}
              {...common}
              stroke="rgba(217,118,39,0.65)"
            />
          ))}
          {/* valley hint */}
          <path
            d="M60 185 C160 205, 420 205, 520 185"
            {...common}
            stroke="rgba(31,35,40,0.12)"
          />
        </>
      );

    case "charles-bridge":
      return Frame(
        <>
          {/* stone arches */}
          <path d="M60 165H520" {...common} stroke="rgba(31,35,40,0.55)" />
          {Array.from({ length: 6 }).map((_, i) => {
            const x1 = 80 + i * 75;
            const x2 = x1 + 60;
            return (
              <path
                key={i}
                d={`M${x1} 165 C${x1 + 15} 120, ${x2 - 15} 120, ${x2} 165`}
                {...common}
                stroke="rgba(181,95,29,0.70)"
              />
            );
          })}
          {/* statues hint */}
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d={`M${90 + i * 45} 165 V145`}
              {...common}
              stroke="rgba(31,35,40,0.20)"
            />
          ))}
        </>
      );

    case "ponte-vecchio":
      return Frame(
        <>
          {/* three arches + houses */}
          <path d="M90 155H470" {...common} stroke="rgba(31,35,40,0.55)" />
          <path d="M110 155 C140 120, 200 120, 230 155" {...common} stroke="rgba(181,95,29,0.75)" />
          <path d="M230 155 C260 110, 300 110, 330 155" {...common} stroke="rgba(181,95,29,0.75)" />
          <path d="M330 155 C360 120, 420 120, 450 155" {...common} stroke="rgba(181,95,29,0.75)" />
          {/* shops silhouette */}
          <path d="M120 115H440" {...common} stroke="rgba(31,35,40,0.35)" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${130 + i * 40} 115 V92`}
              {...common}
              stroke="rgba(31,35,40,0.22)"
            />
          ))}
        </>
      );

    case "rialto-bridge":
      return Frame(
        <>
          {/* single bold arch */}
          <path
            d="M95 165 C170 85, 390 85, 465 165"
            {...common}
            stroke="rgba(31,35,40,0.60)"
          />
          <path d="M80 165H480" {...common} stroke="rgba(181,95,29,0.75)" />
          {/* steps hint */}
          <path d="M180 165 L210 140 L350 140 L380 165" {...common} stroke="rgba(31,35,40,0.25)" />
        </>
      );

    default:
      // No custom croquis yet.
      return null;
  }
}
