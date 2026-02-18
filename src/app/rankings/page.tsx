import Link from "next/link";
import { rankingPages } from "@/lib/rankings";

export const metadata = {
  title: "Rankings",
  description:
    "Ranked bridge lists with engineering context: records, categories, and what the numbers actually mean.",
};

export default function RankingsIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Rankings</h1>
        <p className="mt-3 text-ink/70 max-w-2xl">
          High-intent pages built around what people already search.
        </p>

        <div className="mt-8 grid gap-4">
          {rankingPages.map((p) => (
            <Link
              key={p.slug}
              href={`/rankings/${p.slug}`}
              className="rounded-[22px] bg-paper/60 border border-black/10 px-6 py-5 hover:bg-paper/75 transition"
            >
              <div className="text-xl font-bold">{p.title}</div>
              <div className="mt-1 text-sm text-ink/65">{p.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
