"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { bridges } from "@/lib/bridges";

export default function MapPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <Link
            href="/"
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-white/70 border border-black/10 hover:bg-white transition"
          >
            ← Home
          </Link>
          <Link
            href="/bridges"
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-white/70 border border-black/10 hover:bg-white transition"
          >
            Browse list
          </Link>
        </div>

        <WorldMap
          bridges={bridges}
          onSelect={(slug) => router.push(`/bridges/${slug}`)}
        />
      </main>
    </div>
  );
}
