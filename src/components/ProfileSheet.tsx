import type { Bridge } from "@/lib/bridges";

function Pill(props: { children: React.ReactNode; tone?: "ink" | "accent" }) {
  const tone = props.tone ?? "ink";
  return (
    <div
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border " +
        (tone === "accent"
          ? "bg-accent/10 text-accent border-accent/20"
          : "bg-white/70 text-ink/70 border-black/10")
      }
    >
      {props.children}
    </div>
  );
}

function Stamp(props: { text: string }) {
  return (
    <div className="relative">
      <div className="rotate-[-10deg] rounded-[18px] border-2 border-accent/40 px-4 py-2 text-xs font-extrabold tracking-widest text-accent/80 bg-white/40">
        {props.text}
      </div>
    </div>
  );
}

export default function ProfileSheet(props: {
  bridge: Bridge;
  locale?: "en" | "fr";
  children: React.ReactNode;
}) {
  const b = props.bridge;
  const locale = props.locale ?? "en";
  const isFR = locale === "fr";

  return (
    <div className="relative rounded-[44px] bg-white/55 border border-black/10 shadow-paper overflow-hidden">
      {/* grid paper overlay */}
      <div className="absolute inset-0 opacity-[0.35]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(31,35,40,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,35,40,0.10)_1px,transparent_1px)] bg-[size:22px_22px]" />
      </div>

      {/* paper corners */}
      <div className="pointer-events-none absolute -left-2 -top-2 h-5 w-5 rounded-sm border border-black/15 bg-white/60 rotate-6" />
      <div className="pointer-events-none absolute -right-2 -bottom-2 h-5 w-5 rounded-sm border border-black/15 bg-white/60 -rotate-6" />

      <div className="relative p-8 sm:p-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="text-xs font-semibold text-ink/60 tracking-wide">
              {isFR ? "FICHE PONT" : "BRIDGE PROFILE SHEET"}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Pill tone="accent">{b.type}</Pill>
              {b.yearOpened ? (
                <Pill>
                  {isFR ? "Ouvert :" : "Opened:"} {b.yearOpened}
                </Pill>
              ) : null}
              <Pill>
                {isFR ? "Longueur :" : "Length:"} {b.length}
              </Pill>
              {b.coordinatesApprox ? (
                <Pill>{isFR ? "Localisation : approx." : "Location: approx."}</Pill>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {b.records?.length ? <Stamp text="NOTABLE" /> : <Stamp text="CURATED" />}
          </div>
        </div>

        {/* content */}
        <div className="mt-8 space-y-6">{props.children}</div>

        <div className="mt-10 text-[11px] text-ink/45">
          {isFR
            ? "Astuce : reste simple. Si un terme est technique, explique-le dans le glossaire."
            : "Tip: keep wording simple. If a term feels technical, explain it in the glossary."}
        </div>
      </div>
    </div>
  );
}
