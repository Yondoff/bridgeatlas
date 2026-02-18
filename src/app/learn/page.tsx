import Link from "next/link";
import { learnPages } from "@/lib/learn";

export const metadata = {
  title: "Learn",
  description: "Bridge engineering explainers: how bridge types work, compared clearly.",
};

export default function LearnIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Learn</h1>
        <p className="mt-3 text-ink/70 max-w-2xl">
          Short, practical engineering explanations. No fluff.
        </p>

        <div className="mt-8 grid gap-4">
          {learnPages.map((p) => (
            <Link
              key={p.slug}
              href={`/learn/${p.slug}`}
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
