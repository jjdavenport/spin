import { NextResponse } from "next/server";
import {
  getRandomDestination,
  deductMockCredit,
  getMockBalance,
  addMockSpinHistory,
} from "@/lib/mock-data";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { sendSpinResultEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { region, email } = await request.json();

    // Check credits
    const balance = getMockBalance();
    if (balance <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits. Please purchase more." },
        { status: 402 }
      );
    }

    // Deduct credit
    const success = deductMockCredit();
    if (!success) {
      return NextResponse.json(
        { error: "Failed to deduct credit." },
        { status: 500 }
      );
    }

    // Pick random destination
    const destination = getRandomDestination(region);

    // Record spin
    addMockSpinHistory(destination, region || null);

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

    return NextResponse.json({
      destination,
      remainingCredits: getMockBalance(),
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
