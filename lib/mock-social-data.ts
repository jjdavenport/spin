import { DESTINATIONS } from "./mock-data";
import { DESTINATION_DETAILS } from "./destination-details";

const FIRST_NAMES = [
  "Sarah", "Tom", "Emma", "James", "Olivia", "Noah", "Ava", "Liam",
  "Mia", "Lucas", "Sofia", "Ethan", "Chloe", "Alex", "Luna", "Max",
];

// Seeded random for deterministic mock data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface RecentSpin {
  name: string;
  destinationId: string;
  destinationName: string;
  country: string;
  unsplashPhotoId: string | null;
  timeAgo: string;
}

const TIME_AGOS = [
  "2 min ago", "5 min ago", "12 min ago", "23 min ago",
  "1 hour ago", "2 hours ago", "3 hours ago", "5 hours ago",
  "8 hours ago", "12 hours ago",
];

export const RECENT_SPINS: RecentSpin[] = Array.from({ length: 10 }, (_, i) => {
  const destIndex = Math.floor(seededRandom(i * 7 + 3) * DESTINATIONS.length);
  const nameIndex = Math.floor(seededRandom(i * 13 + 5) * FIRST_NAMES.length);
  const dest = DESTINATIONS[destIndex];
  const details = DESTINATION_DETAILS[dest.id];

  return {
    name: FIRST_NAMES[nameIndex],
    destinationId: dest.id,
    destinationName: dest.name,
    country: dest.country,
    unsplashPhotoId: details?.unsplash_photo_id || null,
    timeAgo: TIME_AGOS[i],
  };
});
