import { NextRequest, NextResponse } from "next/server";
import { getRandomDestination } from "@/lib/mock-data";

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

  const destination = getRandomDestination(region);

  const response = NextResponse.json({ destination });
  response.cookies.set("spin-preview-count", String(currentCount + 1), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
