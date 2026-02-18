import HomeClient from "../HomeClient";
import { getBridge } from "@/lib/bridges";

export const metadata = {
  title: "Accueil",
  description:
    "L’atlas d’ingénierie des plus grands ponts du monde : fiches, explications, sources.",
};

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function PageFR() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient locale="fr" featured={featured as any} />;
}
