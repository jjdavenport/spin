export const REGIONS = [
  "All Regions",
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Middle East",
] as const;

export type Region = (typeof REGIONS)[number];

export const SPIN_COST = 1;
export const FREE_CREDITS = 3;

export const CREDIT_PACKS = [
  { id: "pack_5", credits: 5, price: 299, label: "5 Credits", priceLabel: "$2.99" },
  { id: "pack_20", credits: 20, price: 999, label: "20 Credits", priceLabel: "$9.99" },
  { id: "pack_50", credits: 50, price: 1999, label: "50 Credits", priceLabel: "$19.99" },
] as const;

export const FROM_EMAIL = "Spin <hello@spin.travel>";
