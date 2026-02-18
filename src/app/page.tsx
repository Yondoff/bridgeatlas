import HomeClient from "./HomeClient";
import { getBridge } from "@/lib/bridges";

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function Home() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient featured={featured as any} />;
}
