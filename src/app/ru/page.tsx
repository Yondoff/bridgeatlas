import HomeClient from "../HomeClient";
import { getBridge } from "@/lib/bridges";

export const metadata = {
  title: "Главная",
  description:
    "Инженерный атлас великих мостов мира: профили, объяснения, источники.",
};

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function PageRU() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient locale="ru" featured={featured as any} />;
}
