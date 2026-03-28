import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { credits } = await request.json();

    if (!credits || typeof credits !== "number" || credits <= 0) {
      return NextResponse.json(
        { error: "Invalid credit amount." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("credit_ledger").insert({
      user_id: user.id,
      amount: credits,
      transaction_type: "bonus",
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to add credits." },
        { status: 500 }
      );
    }

    const { data: balance } = await supabase.rpc("get_credit_balance", {
      p_user_id: user.id,
    });

    return NextResponse.json({ success: true, balance: balance ?? 0 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
