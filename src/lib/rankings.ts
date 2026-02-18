export type RankingPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  /** Bridge slugs to include in this ranking (ordered) */
  bridgeSlugs: string[];
};

// Starter set. Add/adjust as you grow the dataset.
export const rankingPages: RankingPage[] = [
  {
    slug: "longest-bridges",
    title: "Longest bridges in the world (by total length)",
    description:
      "A curated ranking of famously long bridges (mostly mega-viaducts) and why repetition beats drama at scale.",
    intro:
      "For total length records, the story is usually viaduct engineering: thousands of repeatable spans, tight quality control, and maintenance at enormous scale.",
    bridgeSlugs: [
      "danyang-kunshan-grand-bridge",
      "changhua-kaohsiung-viaduct",
      "tianjin-grand-bridge",
      "weinan-weihe-grand-bridge",
      "bang-na-expressway",
    ],
  },
];
