export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  description: string;
  image_url: string | null;
}

export interface CreditLedgerEntry {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: "purchase" | "spin" | "refund" | "bonus";
  reference_id: string | null;
  created_at: string;
}

export interface SpinHistoryEntry {
  id: string;
  user_id: string;
  destination_id: string;
  region_filter: string | null;
  created_at: string;
  destination?: Destination;
}

export type SpinPhase = "idle" | "spinning" | "revealing" | "revealed";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  booking_type?: "experience" | "hotel" | "transport";
}

export interface DestinationDetails {
  unsplash_photo_id: string;
  airport_code: string;
  best_time_to_visit: string;
  visa_info: string;
  budget_range: { low: number; high: number; currency: string };
  highlights: string[];
  itinerary: ItineraryDay[];
}

export interface EmailSubscription {
  id: string;
  email: string;
  destination_id: string;
  created_at: string;
}
