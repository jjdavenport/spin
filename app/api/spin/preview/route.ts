import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const MAX_FREE_SPINS = 50;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const region = body.region || null;

  // Cookie-based rate limiting for free spins
  const countCookie = req.cookies.get("spin-preview-count");
  const currentCount = countCookie ? parseInt(countCookie.value, 10) || 0 : 0;

  if (currentCount >= MAX_FREE_SPINS) {
    return NextResponse.json(
      {
        error: "Sign up for unlimited spins",
        requiresAuth: true,
      },
      { status: 429 }
    );
  }

  const supabase = await createServiceClient();

  let query = supabase.from("destinations").select("*");
  if (region && region !== "All Regions") {
    query = query.eq("region", region);
  }

  const { data: destinations, error } = await query;

  if (error || !destinations || destinations.length === 0) {
    return NextResponse.json(
      { error: "No destinations available." },
      { status: 500 }
    );
  }

  const destination =
    destinations[Math.floor(Math.random() * destinations.length)];

  const response = NextResponse.json({ destination });
  response.cookies.set("spin-preview-count", String(currentCount + 1), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
