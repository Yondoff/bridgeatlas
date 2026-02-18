// Minimal mapping for our dataset; extend as needed.
// Returns ISO-3166 alpha-2 codes.
const COUNTRY_TO_CODE: Record<string, string[]> = {
  "United States": ["US"],
  "United Kingdom": ["GB"],
  France: ["FR"],
  Germany: ["DE"],
  Turkey: ["TR"],
  Brazil: ["BR"],
  Russia: ["RU"],
  Egypt: ["EG"],
  Mozambique: ["MZ"],
  "South Africa": ["ZA"],
  "Bosnia and Herzegovina": ["BA"],

  China: ["CN"],
  Taiwan: ["TW"],
  Thailand: ["TH"],
  Australia: ["AU"],
  Japan: ["JP"],
  Portugal: ["PT"],
  Canada: ["CA"],
  India: ["IN"],
  Hungary: ["HU"],
  Italy: ["IT"],
  Singapore: ["SG"],
  "Czech Republic": ["CZ"],

  Denmark: ["DK"],
  "Denmark / Sweden": ["DK", "SE"],
};

export function flagsForCountry(country: string): string[] {
  return COUNTRY_TO_CODE[country] ?? [];
}
