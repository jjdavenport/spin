const COUNTRY_CODES: Record<string, string> = {
  France: "fr",
  Italy: "it",
  Spain: "es",
  Netherlands: "nl",
  Greece: "gr",
  "Czech Republic": "cz",
  Iceland: "is",
  Croatia: "hr",
  Scotland: "gb-sct",
  Austria: "at",
  Portugal: "pt",
  Denmark: "dk",
  Japan: "jp",
  Indonesia: "id",
  Thailand: "th",
  "South Korea": "kr",
  Vietnam: "vn",
  Singapore: "sg",
  Nepal: "np",
  Laos: "la",
  India: "in",
  "South Africa": "za",
  Morocco: "ma",
  Tanzania: "tz",
  Zimbabwe: "zw",
  Egypt: "eg",
  Madagascar: "mg",
  Kenya: "ke",
  "United States": "us",
  Canada: "ca",
  Mexico: "mx",
  Cuba: "cu",
  Brazil: "br",
  Peru: "pe",
  Argentina: "ar",
  Ecuador: "ec",
  Colombia: "co",
  Bolivia: "bo",
  Australia: "au",
  "New Zealand": "nz",
  "French Polynesia": "pf",
  Fiji: "fj",
  UAE: "ae",
  Jordan: "jo",
  Turkey: "tr",
  Israel: "il",
  Oman: "om",
};

export function getCountryCode(country: string): string {
  return COUNTRY_CODES[country] || "";
}

export function getCountryFlagUrl(country: string): string {
  const code = COUNTRY_CODES[country];
  if (!code) return "";
  return `https://flagcdn.com/20x15/${code}.png`;
}
