import { NextResponse } from "next/server";
import {
  getRandomDestination,
  deductMockCredit,
  getMockBalance,
  addMockSpinHistory,
} from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const { region } = await request.json();

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
