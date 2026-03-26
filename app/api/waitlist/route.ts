import { NextResponse } from "next/server";
import { addMockWaitlistEntry, getMockWaitlistCount } from "@/lib/mock-data";
import { sendWaitlistEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    addMockWaitlistEntry(email);
    const count = getMockWaitlistCount();

    sendWaitlistEmail(email, count).catch(() => {});

    return NextResponse.json({ success: true, position: count });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
