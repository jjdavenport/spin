import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { partner, destination, context, timestamp, url } =
      await request.json();

    if (!partner || !destination) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();
    const { error } = await supabase.from("affiliate_clicks").insert({
      partner,
      destination,
      context: context ?? null,
      page_url: url ?? null,
      clicked_at: timestamp ?? new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to log affiliate click:", error);
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Fail silently — tracking should never affect UX
    return NextResponse.json({ ok: true });
  }
}
