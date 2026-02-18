"use client";

import { motion } from "framer-motion";
import BridgeIllustration from "@/components/BridgeIllustration";
import BridgeCroquis, { hasCroquis } from "@/components/BridgeCroquis";

export default function BridgeHero(props: {
  slug?: string;
  type: string;
  name: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[44px] bg-white/55 border border-black/10 shadow-paper overflow-hidden"
    >
      <div className="grid sm:grid-cols-[1.15fr_0.85fr]">
        <div className="p-8 sm:p-10">
          <div className="text-xs font-semibold text-ink/60">BRIDGE PROFILE</div>
          <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
            {props.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-ink/70 leading-7">
            {props.subtitle}
          </p>
        </div>

        {/* “profile” illustration panel, black & white */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative p-6 sm:p-8"
        >
          <div className="absolute inset-0 opacity-[0.35]">
            {/* subtle grid paper */}
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(31,35,40,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,35,40,0.10)_1px,transparent_1px)] bg-[size:22px_22px]" />
          </div>

          <div className="relative">
            {props.slug && hasCroquis(props.slug) ? (
              <BridgeCroquis
                slug={props.slug}
                className="rounded-[36px] border border-black/10 bg-paper/70 overflow-hidden grayscale"
              />
            ) : (
              <BridgeIllustration
                slug={props.name}
                type={props.type}
                className="rounded-[36px] border border-black/10 bg-paper/70 overflow-hidden grayscale"
              />
            )}

            {/* small paper details */}
            <div className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 rounded-sm border border-black/15 bg-white/60 rotate-6" />
            <div className="pointer-events-none absolute -right-2 -bottom-2 h-4 w-4 rounded-sm border border-black/15 bg-white/60 -rotate-6" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
