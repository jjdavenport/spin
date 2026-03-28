import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServiceClient();
  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("id, name, country, region, latitude, longitude");

  if (error || !destinations) {
    return NextResponse.json(
      { error: "Failed to load destinations" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { destinations },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
