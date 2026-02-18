import type { Bridge } from "@/lib/bridges";

const DEFAULT_GLOSSARY: Array<{ term: string; simple: string }> = [
  {
    term: "Span",
    simple: "The distance between two supports.",
  },
  {
    term: "Main span",
    simple: "The biggest/central span (often the hardest part).",
  },
  {
    term: "Foundation",
    simple: "The part underground that transfers forces into the ground.",
  },
  {
    term: "Cable (tension)",
    simple: "Cables are pulled (they work in tension).",
  },
  {
    term: "Compression",
    simple: "When a part is being squeezed (arches/towers often take compression).",
  },
  {
    term: "Wind stability",
    simple: "How the bridge behaves in strong wind (movement, vibration, safety).",
  },
  {
    term: "Maintenance",
    simple: "The ongoing work that keeps a bridge safe: inspections, paint, repairs.",
  },
];

export default function Glossary(_props: { bridge: Bridge }) {
  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 p-5">
      <div className="text-sm font-semibold">Simple glossary</div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {DEFAULT_GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-[20px] bg-white/60 border border-black/10 px-4 py-3">
            <div className="text-xs font-semibold text-ink/70">{g.term}</div>
            <div className="mt-1 text-sm text-ink/70 leading-6">{g.simple}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
