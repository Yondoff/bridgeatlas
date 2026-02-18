import type { Bridge } from "@/lib/bridges";

export type BridgeDe = Partial<
  Pick<Bridge, "intro" | "tagline" | "funFact" | "engineeringBreakdown" | "records">
> & {
  quickFacts?: Array<{ label: string; value: string }>;
};

// Incremental German localisation.
// Any missing field falls back to English.
export const BRIDGE_DE: Record<string, BridgeDe> = {
  "millau-viaduct": {
    intro:
      "Das Viaduc de Millau ist eine Schrägseilbrücke über das Tarn-Tal bei Millau. Berühmt ist es für seine extreme Höhe und die schlanke Silhouette – riesig, aber überraschend leicht wirkend.",
    tagline: "Ein Schrägseil-Gigant, der Höhe mühelos aussehen lässt.",
    funFact:
      "Aus der Ferne wirkt es fast wie eine Linie am Himmel – genau diese Schlankheit ist Teil der Ingenieurskunst.",
  },
};
