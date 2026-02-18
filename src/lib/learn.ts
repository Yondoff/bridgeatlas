export type LearnSection = {
  heading: string;
  paragraphs: string[];
};

export type LearnPage = {
  slug: string;
  title: string;
  description: string;
  /** Sections used to build H2 structure for SEO. */
  sections: LearnSection[];
  /** Bridge slugs to link as examples */
  relatedBridgeSlugs?: string[];
};

// Starter set (you can expand weekly).
export const learnPages: LearnPage[] = [
  {
    slug: "how-suspension-bridges-work",
    title: "How suspension bridges work",
    description:
      "A practical engineering explanation: load paths, cables, towers, anchors, and why stiffness & wind matter.",
    body: [
      "A suspension bridge is basically a giant system for redirecting the deck’s weight into the ground.",
      "Load path (the core idea): deck → hangers → main cables → anchors + towers → foundations → ground.",
      "What engineers obsess over: stiffness (so the deck doesn’t feel ‘soft’), fatigue, corrosion, and wind stability.",
      "If you want to read the bridge like an engineer, always ask: ‘Where do forces go next?’",
    ],
    relatedBridgeSlugs: ["golden-gate-bridge", "akashi-kaikyo-bridge"],
  },
  {
    slug: "cable-stayed-vs-suspension",
    title: "Cable-stayed vs suspension",
    description:
      "Two iconic long-span types, compared: structure, stiffness, construction method, and when each wins.",
    body: [
      "Cable-stayed bridges connect cables directly from tower to deck. Suspension bridges hang the deck from main cables.",
      "Rule of thumb: cable-stayed tends to be stiffer; suspension tends to win for the very longest spans.",
      "Construction differs too: cable-stayed often uses balanced cantilever; suspension often spins cables then hangs the deck.",
    ],
  },
];
