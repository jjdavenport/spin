import { NextResponse } from "next/server";
import { getMockHistory } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ history: getMockHistory() });
}
