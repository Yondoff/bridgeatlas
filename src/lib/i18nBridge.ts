import type { Bridge } from "@/lib/bridges";
import { BRIDGE_FR } from "@/lib/bridgesFr";

export function localizeBridge(b: Bridge, locale: "en" | "fr"): Bridge {
  if (locale !== "fr") return b;
  const fr = BRIDGE_FR[b.slug];
  if (!fr) return b;

  return {
    ...b,
    intro: fr.intro ?? b.intro,
    tagline: fr.tagline ?? b.tagline,
    funFact: fr.funFact ?? b.funFact,
    engineeringBreakdown: fr.engineeringBreakdown ?? b.engineeringBreakdown,
    records: fr.records ?? b.records,
    quickFacts: fr.quickFacts ?? b.quickFacts,
  };
}
