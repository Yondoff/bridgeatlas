import React from "react";

export default function BridgeIllustration(props: {
  slug?: string;
  type?: string;
  className?: string;
}) {
  const type = props.type ?? "other";
  const slug = props.slug ?? "bridge";

  // Simple, lightweight SVGs (no external images). Feels like “illustrations” but stays fast.
  // Colors come from CSS variables set in globals.css.
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  // deterministic “uniqueness” per bridge
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed = (seed * 31 + slug.charCodeAt(i)) >>> 0;
  const rnd = (n: number) => ((seed % n) + n) % n;
  const sunX = 420 + (rnd(120) - 60);
  const sunY = 55 + (rnd(40) - 20);
  const waveShift = rnd(40) - 20;

  return (
    <div
      className={
        props.className ??
        "relative overflow-hidden rounded-[28px] bg-paper/70 border border-black/10"
      }
      aria-hidden
    >
      <svg
        viewBox="0 0 560 220"
        className="h-[140px] w-full text-ink/70"
      >
        {/* sky texture */}
        <path
          d={`M20 70 C120 ${20 + waveShift}, 200 ${90 - waveShift}, 280 60 C360 ${30 + waveShift}, 420 ${90 - waveShift}, 540 45`}
          {...common}
          stroke="rgba(31,35,40,0.18)"
        />

        {/* ground */}
        <path
          d="M20 190 H540"
          {...common}
          stroke="rgba(31,35,40,0.22)"
        />

        {/* accent sun */}
        <circle cx={sunX} cy={sunY} r={18} fill="rgba(217,118,39,0.18)" />
        <circle cx={sunX} cy={sunY} r={9} fill="rgba(217,118,39,0.26)" />

        {/* bridge variants */}
        {type === "suspension" ? (
          <>
            {/* more Golden Gate-like (two towers + lower deck + warmer cable) */}
            <path d="M150 190 V60" {...common} stroke="rgba(31,35,40,0.55)" />
            <path d="M410 190 V60" {...common} stroke="rgba(31,35,40,0.55)" />
            {/* tower crossbeams */}
            <path d="M150 92 H190" {...common} stroke="rgba(31,35,40,0.30)" />
            <path d="M410 92 H370" {...common} stroke="rgba(31,35,40,0.30)" />

            {/* main cable */}
            <path
              d="M90 76 C200 0, 360 0, 470 76"
              {...common}
              stroke="rgba(217,118,39,0.80)"
            />

            {/* deck */}
            <path d="M70 158 H490" {...common} stroke="rgba(31,35,40,0.60)" />

            {/* hangers */}
            {Array.from({ length: 11 }).map((_, i) => {
              const x = 115 + i * 32;
              const t = i / 10;
              const y = 76 - 24 * (1 - (2 * t - 1) ** 2);
              return (
                <path
                  key={i}
                  d={`M${x} ${y} V158`}
                  {...common}
                  stroke="rgba(31,35,40,0.33)"
                />
              );
            })}

            {/* hint of fog */}
            <path
              d="M40 176 C120 156, 220 190, 300 170 C390 148, 470 188, 520 170"
              {...common}
              stroke="rgba(31,35,40,0.10)"
            />
          </>
        ) : type === "cable-stayed" ? (
          <>
            {/* pylons */}
            <path d="M200 190 V60" {...common} stroke="rgba(31,35,40,0.50)" />
            <path d="M360 190 V60" {...common} stroke="rgba(31,35,40,0.50)" />
            {/* deck */}
            <path d="M80 155 H480" {...common} stroke="rgba(31,35,40,0.58)" />
            {/* stays */}
            {Array.from({ length: 7 }).map((_, i) => {
              const x = 110 + i * 52;
              return (
                <React.Fragment key={i}>
                  <path
                    d={`M200 70 L${x} 155`}
                    {...common}
                    stroke="rgba(217,118,39,0.65)"
                  />
                  <path
                    d={`M360 70 L${560 - x} 155`}
                    {...common}
                    stroke="rgba(217,118,39,0.65)"
                  />
                </React.Fragment>
              );
            })}
          </>
        ) : type === "arch" ? (
          <>
            {/* arch */}
            <path
              d="M90 155 C170 55, 390 55, 470 155"
              {...common}
              stroke="rgba(181,95,29,0.78)"
            />
            {/* deck */}
            <path d="M80 155 H480" {...common} stroke="rgba(31,35,40,0.55)" />
            {/* spandrels */}
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 110 + i * 40;
              return (
                <path
                  key={i}
                  d={`M${x} 155 V${125 - Math.abs(4 - i) * 6}`}
                  {...common}
                  stroke="rgba(31,35,40,0.30)"
                />
              );
            })}
          </>
        ) : (
          <>
            {/* simple beam/truss-ish */}
            <path d="M80 155 H480" {...common} stroke="rgba(31,35,40,0.60)" />
            <path
              d="M90 155 L150 115 L210 155 L270 115 L330 155 L390 115 L450 155"
              {...common}
              stroke="rgba(217,118,39,0.55)"
            />
          </>
        )}
      </svg>

      {/* subtle corner label pill */}
      <div className="absolute left-3 top-3 rounded-full bg-white/65 border border-black/10 px-3 py-1 text-[11px] font-semibold text-ink/70">
        Illustration
      </div>
    </div>
  );
}
