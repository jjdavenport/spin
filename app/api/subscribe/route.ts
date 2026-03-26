import { NextResponse } from "next/server";
import { addMockEmailSubscription, DESTINATIONS } from "@/lib/mock-data";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { sendSubscriptionEmail } from "@/lib/send-email";

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

    const dest = DESTINATIONS.find((d) => d.id === destinationId);
    if (dest) {
      const details = DESTINATION_DETAILS[destinationId];
      const photoId = details?.unsplash_photo_id;
      sendSubscriptionEmail(email, {
        destinationName: dest.name,
        country: dest.country,
        description: dest.description,
        imageUrl: photoId
          ? `https://images.unsplash.com/photo-${photoId}?w=560&h=200&fit=crop`
          : null,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, subscription });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
