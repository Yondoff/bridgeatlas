import HomeClient from "../HomeClient";
import { getBridge } from "@/lib/bridges";

export const metadata = {
  title: "ホーム",
  description:
    "世界の偉大な橋の工学アトラス：プロフィール、解説、出典。",
};

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function PageJA() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient locale="ja" featured={featured as any} />;
}
