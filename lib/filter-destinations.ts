import { Destination, DestinationDetails, SpinFilters } from "./types";
import { CLIMATE_MAP } from "./climate-map";
import { getAirportByCode, distanceBetween } from "./airports";

const DIRECT_FLIGHT_RANGE_KM = 6000;

// Patterns that indicate visa-friendly destinations
const VISA_FRIENDLY_PATTERNS = [
  "visa-free",
  "visa on arrival",
  "no visa needed",
];

// Patterns that indicate visa is required
const VISA_REQUIRED_PATTERNS = [
  "esta required",
  "eta required",
  "e-visa required",
  "tourist card required",
  "e-visa available",
];

function isVisaFriendly(visaInfo: string): boolean {
  const lower = visaInfo.toLowerCase();
  // If it explicitly mentions visa-free or visa on arrival, it's friendly
  if (VISA_FRIENDLY_PATTERNS.some((p) => lower.includes(p))) {
    // But not if it also requires ESTA/ETA
    if (VISA_REQUIRED_PATTERNS.some((p) => lower.includes(p))) {
      return false;
    }
    return true;
  }
  // Schengen zone is visa-friendly for most
  if (lower.includes("schengen zone")) return true;
  // UK visa-free
  if (lower.includes("visa-free for 6 months")) return true;
  // Jordan Pass counts
  if (lower.includes("jordan pass")) return true;
  return false;
}

function isLikelyDirectFlight(
  homeAirportCode: string,
  destLat: number,
  destLng: number
): boolean {
  const home = getAirportByCode(homeAirportCode);
  if (!home) return true; // If we can't find the airport, don't filter it out
  const dist = distanceBetween(home.lat, home.lng, destLat, destLng);
  return dist <= DIRECT_FLIGHT_RANGE_KM;
}

export function filterDestinations(
  destinations: Destination[],
  details: Record<string, DestinationDetails>,
  filters: SpinFilters
): string[] {
  return destinations
    .filter((dest) => {
      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(dest.region)) {
        return false;
      }

      // Climate filter
      if (filters.climates.length > 0) {
        const destClimates = CLIMATE_MAP[dest.id] || [];
        if (!filters.climates.some((c) => destClimates.includes(c))) {
          return false;
        }
      }

      const destDetails = details[dest.id];

      // Visa-free filter
      if (filters.visaFreeOnly && destDetails) {
        if (!isVisaFriendly(destDetails.visa_info)) {
          return false;
        }
      }

      // Direct flights filter
      if (filters.directFlightsOnly && filters.homeAirport) {
        if (!isLikelyDirectFlight(filters.homeAirport, dest.latitude, dest.longitude)) {
          return false;
        }
      }

      return true;
    })
    .map((dest) => dest.id);
}

export function getDefaultFilters(): SpinFilters {
  return {
    regions: [],
    climates: [],
    homeAirport: null,
    visaFreeOnly: false,
    directFlightsOnly: false,
  };
}

export function getActiveFilterCount(filters: SpinFilters): number {
  let count = 0;
  if (filters.regions.length > 0) count++;
  if (filters.climates.length > 0) count++;
  if (filters.visaFreeOnly) count++;
  if (filters.directFlightsOnly) count++;
  if (filters.homeAirport) count++;
  return count;
}
