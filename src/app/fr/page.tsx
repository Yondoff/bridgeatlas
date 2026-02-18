import HomeClient from "../HomeClient";

export const metadata = {
  title: "Accueil",
  description:
    "L’atlas d’ingénierie des plus grands ponts du monde : fiches, explications, sources.",
};

export default function PageFR() {
  return <HomeClient locale="fr" />;
}
