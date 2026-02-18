import type { Bridge } from "@/lib/bridges";

export type BridgeFr = Partial<Pick<Bridge, "intro" | "tagline" | "funFact" | "engineeringBreakdown" | "records">> & {
  quickFacts?: Array<{ label: string; value: string }>;
};

// Incremental French localisation.
// Any missing field falls back to the English content in `bridges.ts`.
export const BRIDGE_FR: Record<string, BridgeFr> = {
  "golden-gate-bridge": {
    intro:
      "Le Golden Gate Bridge est un pont suspendu qui franchit le détroit du Golden Gate et relie San Francisco au comté de Marin. C’est un symbole autant qu’un ouvrage : site venté, brouillard salin, maintenance constante.",
    tagline:
      "Une icône suspendue conçue pour le vent, le brouillard et un site impitoyable.",
    funFact:
      "Il est célèbre pour une raison : même sans aimer les ponts, tu le reconnais instantanément.",
  },
  "brooklyn-bridge": {
    intro:
      "Le Brooklyn Bridge relie Manhattan à Brooklyn au-dessus de l’East River. Son design hybride (suspension + haubans) et ses tours en pierre en font un monument de l’ingénierie du XIXe siècle.",
    tagline:
      "Un hybride historique qui a transformé la skyline en infrastructure.",
    funFact:
      "C’est un pont qui raconte l’époque : matériaux, détails et contraintes visibles à l’œil nu.",
  },
  "tower-bridge": {
    intro:
      "Tower Bridge est un pont basculant (bascule) combiné à une suspension, au-dessus de la Tamise. Il est iconique car c’est à la fois une machine (pont mobile) et un décor victorien assumé.",
    tagline: "Un pont mobile fonctionnel… et un symbole de Londres.",
    funFact:
      "Ici, la contrainte n’est pas que routière : il faut aussi laisser passer la navigation.",
  },
  "millau-viaduct": {
    intro:
      "Le Viaduc de Millau est un pont à haubans qui franchit la vallée du Tarn. Il est célèbre pour sa hauteur extrême et sa silhouette très fine : un ouvrage gigantesque qui paraît léger.",
    tagline: "Un géant à haubans qui rend la hauteur presque naturelle.",
    funFact:
      "Quand tu le vois de loin, tu comprends l’idée : minimiser la matière, maximiser la portée.",
  },
  "akashi-kaikyo-bridge": {
    intro:
      "Le pont Akashi Kaikyō relie Kobe à l’île d’Awaji. Il est connu pour sa portée exceptionnelle et pour les contraintes de site : grande profondeur, vents forts et séismes.",
    tagline: "Un super-pont suspendu pensé pour le vent et les tremblements de terre.",
    funFact:
      "Sur ce type de portée, la stabilité aérodynamique n’est pas un détail : c’est une contrainte de base.",
  },
  "oresund-bridge": {
    intro:
      "L’Øresund Link combine pont, île artificielle et tunnel pour relier le Danemark et la Suède. C’est une infrastructure complète, pas juste une travée.",
    tagline: "Pont + île + tunnel : l’infrastructure comme système.",
    funFact:
      "Le ‘truc’ ici, c’est l’intégration : marine, aviation, et exploitation au quotidien.",
  },
};
