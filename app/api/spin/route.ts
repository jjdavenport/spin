import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { sendSpinResultEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { region, email, destinationIds } = await request.json();

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check credits
    const { data: balance } = await supabase.rpc("get_credit_balance", {
      p_user_id: user.id,
    });

    if (!balance || balance <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits. Please purchase more." },
        { status: 402 }
      );
    }

    // Deduct credit
    const { error: deductError } = await supabase
      .from("credit_ledger")
      .insert({
        user_id: user.id,
        amount: -1,
        transaction_type: "spin",
      });

    if (deductError) {
      return NextResponse.json(
        { error: "Failed to deduct credit." },
        { status: 500 }
      );
    }

    // Pick random destination
    let query = supabase.from("destinations").select("*");
    if (
      Array.isArray(destinationIds) &&
      destinationIds.length > 0 &&
      destinationIds.length <= 100
    ) {
      query = query.in("id", destinationIds);
    } else if (region && region !== "All Regions") {
      query = query.eq("region", region);
    }
    const { data: destinations } = await query;

    if (!destinations || destinations.length === 0) {
      return NextResponse.json(
        { error: "No destinations available." },
        { status: 500 }
      );
    }

    const destination =
      destinations[Math.floor(Math.random() * destinations.length)];

    // Record spin
    await supabase.from("spin_history").insert({
      user_id: user.id,
      destination_id: destination.id,
      region_filter: region || null,
    });

    // Send spin result email if email provided
    if (email) {
      const details = DESTINATION_DETAILS[destination.id];
      if (details) {
        const photoId = details.unsplash_photo_id;
        sendSpinResultEmail(email, {
          destinationId: destination.id,
          destinationName: destination.name,
          country: destination.country,
          region: destination.region,
          description: destination.description,
          imageUrl: photoId
            ? `https://images.unsplash.com/photo-${photoId}?w=560&h=240&fit=crop`
            : null,
          airportCode: details.airport_code,
          bestTimeToVisit: details.best_time_to_visit,
          highlights: details.highlights,
          budgetRange: details.budget_range,
        }).catch(() => {});
      }
    }

    // Get updated balance
    const { data: newBalance } = await supabase.rpc("get_credit_balance", {
      p_user_id: user.id,
    });

    return NextResponse.json({
      destination,
      remainingCredits: newBalance ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
