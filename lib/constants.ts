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

export const FROM_EMAIL = "Spin <onboarding@resend.dev>";
