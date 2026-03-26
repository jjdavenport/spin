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
