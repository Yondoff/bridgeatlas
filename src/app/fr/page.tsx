import HomeClient from "../HomeClient";

export const metadata = {
  title: "Accueil",
  description:
    "L’atlas d’ingénierie des plus grands ponts du monde : fiches, explications, sources.",
};

export default function PageFR() {
  // For now we reuse the same UI. We'll translate UI strings next.
  return <HomeClient />;
}
