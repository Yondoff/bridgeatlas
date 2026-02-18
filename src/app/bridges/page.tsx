import BridgesClient from "./BridgesClient";
import { bridges } from "@/lib/bridges";

export default function BridgesPage() {
  return <BridgesClient bridges={bridges} />;
}
