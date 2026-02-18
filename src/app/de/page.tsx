import HomeClient from "../HomeClient";
import { getBridge } from "@/lib/bridges";

export const metadata = {
  title: "Startseite",
  description:
    "Der Ingenieur‑Atlas der größten Brücken der Welt: Profile, Erklärungen, Quellen.",
};

const FEATURED = [
  "golden-gate-bridge",
  "brooklyn-bridge",
  "tower-bridge",
  "millau-viaduct",
  "akashi-kaikyo-bridge",
  "oresund-bridge",
];

export default function PageDE() {
  const featured = FEATURED.map((s) => getBridge(s)).filter(Boolean);
  return <HomeClient locale="de" featured={featured as any} />;
}
