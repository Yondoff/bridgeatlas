import type { Bridge } from "@/lib/bridges";
import { BRIDGE_FR } from "@/lib/bridgesFr";
import { BRIDGE_DE } from "@/lib/bridgesDe";

export function localizeBridge(b: Bridge, locale: "en" | "fr" | "de"): Bridge {
  if (locale === "fr") {
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

  if (locale === "de") {
    const de = BRIDGE_DE[b.slug];
    if (!de) return b;
    return {
      ...b,
      intro: de.intro ?? b.intro,
      tagline: de.tagline ?? b.tagline,
      funFact: de.funFact ?? b.funFact,
      engineeringBreakdown: de.engineeringBreakdown ?? b.engineeringBreakdown,
      records: de.records ?? b.records,
      quickFacts: de.quickFacts ?? b.quickFacts,
    };
  }

  return b;
}
