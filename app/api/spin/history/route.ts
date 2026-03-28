import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ history: [] });
  }

  const { data: history } = await supabase
    .from("spin_history")
    .select("id, user_id, destination_id, region_filter, created_at, destinations(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Reshape to match expected format
  const formatted = (history ?? []).map((entry) => ({
    id: entry.id,
    user_id: entry.user_id,
    destination_id: entry.destination_id,
    region_filter: entry.region_filter,
    created_at: entry.created_at,
    destination: entry.destinations,
  }));

  return NextResponse.json({ history: formatted });
}
