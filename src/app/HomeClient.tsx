"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WelcomeMark from "@/components/WelcomeMark";

export default function HomeClient() {
  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[40px] bg-white/60 border border-black/10 shadow-paper px-8 py-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-7"
          >
            <WelcomeMark />
          </motion.div>

          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink/60">
                BRIDGEATLAS
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
                Iconic bridges, explained.
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-7 text-ink/70 max-w-xl">
                A curated gallery of legendary bridges — clean, visual, and easy to browse.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/map"
                  className="rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold hover:bg-accentDeep transition"
                >
                  Explore the world map
                </Link>
                <Link
                  href="/bridges"
                  className="rounded-full bg-white/70 border border-black/10 px-6 py-3 text-sm font-semibold text-ink hover:bg-white transition"
                >
                  Browse bridges
                </Link>
              </div>
            </div>

            <div className="w-full sm:w-[320px]">
              <div className="rounded-[32px] bg-paper/80 border border-black/10 p-5">
                <div className="text-sm font-semibold">What you’ll get</div>
                <ul className="mt-3 space-y-2 text-sm text-ink/70">
                  <li>• Zero clutter, curvy UI, paper-like warmth</li>
                  <li>• Clean bridge profiles with engineering breakdowns</li>
                  <li>• Interactive world map</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 text-xs text-ink/50">
          Tip: start with the map, then open a bridge profile.
        </div>
      </main>
    </div>
  );
}
