import HomeClient from "../HomeClient";
import { getBridge } from "@/lib/bridges";

export const metadata = {
  title: "Inicio",
  description:
    "El atlas de ingeniería de los mejores puentes del mundo: fichas, explicaciones y fuentes.",
};

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function PageES() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient locale="es" featured={featured as any} />;
}
