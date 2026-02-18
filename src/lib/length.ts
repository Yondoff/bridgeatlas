// Parse a length string like:
// "Total length: ~164.8 km" | "Total length: ~244 m" | "Bridge length: ~7.8 km"
// into meters for sorting.
export function parseLengthMeters(input: string): number | null {
  const s = input.toLowerCase();
  const km = s.match(/([0-9]+(?:\.[0-9]+)?)\s*km/);
  if (km) return Number(km[1]) * 1000;
  const m = s.match(/([0-9]+(?:\.[0-9]+)?)\s*m/);
  if (m) return Number(m[1]);
  return null;
}
