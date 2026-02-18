const CODE_TO_NAME: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  TR: "Turkey",
  BR: "Brazil",
  RU: "Russia",
  EG: "Egypt",
  MZ: "Mozambique",
  ZA: "South Africa",
  BA: "Bosnia and Herzegovina",

  CN: "China",
  JP: "Japan",
  AU: "Australia",
  PT: "Portugal",
  CA: "Canada",
  IN: "India",
  IT: "Italy",
  SG: "Singapore",
  CZ: "Czech Republic",
  HU: "Hungary",
  TW: "Taiwan",
  TH: "Thailand",
  DK: "Denmark",
  SE: "Sweden",
};

export function countryNameFromCode(code: string): string {
  return CODE_TO_NAME[code.toUpperCase()] ?? code.toUpperCase();
}
