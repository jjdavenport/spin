import { NextResponse } from "next/server";
import { addMockEmailSubscription } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const { email, destinationId } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!destinationId) {
      return NextResponse.json(
        { error: "Destination is required." },
        { status: 400 }
      );
    }

    const subscription = addMockEmailSubscription(email, destinationId);

    return NextResponse.json({ success: true, subscription });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
