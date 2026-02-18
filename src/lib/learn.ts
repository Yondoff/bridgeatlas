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
    sections: [
      {
        heading: "The core idea: where do forces go?",
        paragraphs: [
          "A suspension bridge is a system for redirecting the deck’s weight into the ground.",
          "The clean load path is: deck → hangers → main cables → anchors + towers → foundations → ground.",
        ],
      },
      {
        heading: "Main components",
        paragraphs: [
          "Deck: the roadway (or rail) you use.",
          "Hangers: vertical elements that connect the deck to the main cables.",
          "Main cables: the big force carriers in tension.",
          "Towers and anchorages: where forces get transferred into foundations and ultimately the ground.",
        ],
      },
      {
        heading: "What governs the design",
        paragraphs: [
          "Stiffness controls user comfort and serviceability (movement you can feel).",
          "Wind is a first-class constraint for long spans: aerodynamics, damping, and detailing matter.",
          "Durability is the long game: fatigue, corrosion protection, and inspection access define lifecycle cost.",
        ],
      },
    ],
    relatedBridgeSlugs: ["golden-gate-bridge", "akashi-kaikyo-bridge"],
  },
  {
    slug: "cable-stayed-vs-suspension",
    title: "Cable-stayed vs suspension",
    description:
      "Two iconic long-span types, compared: structure, stiffness, construction method, and when each wins.",
    sections: [
      {
        heading: "Structural difference in one sentence",
        paragraphs: [
          "Cable-stayed bridges connect cables directly from tower to deck; suspension bridges hang the deck from main cables.",
        ],
      },
      {
        heading: "Stiffness, span range, and when each wins",
        paragraphs: [
          "Rule of thumb: cable-stayed tends to be stiffer; suspension tends to win for the very longest spans.",
          "The ‘best’ type depends on site constraints: span, wind, clearance, construction staging, and maintenance strategy.",
        ],
      },
      {
        heading: "Construction methods (high level)",
        paragraphs: [
          "Cable-stayed often uses balanced cantilever: you build outward from the towers.",
          "Suspension often requires cable spinning (or prefabricated strands) before hanging deck segments.",
        ],
      },
    ],
  },
];
