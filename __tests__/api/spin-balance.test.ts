import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { GET } from "@/app/api/spin/balance/route";
import { createClient } from "@/lib/supabase/server";

function mockSupabase(user: { id: string } | null, balance: number | null = 0) {
  (createClient as any).mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
    rpc: vi.fn().mockResolvedValue({ data: balance }),
  });
}

describe("GET /api/spin/balance", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 0 when user is not authenticated", async () => {
    mockSupabase(null);
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.balance).toBe(0);
  });

  it("returns balance from RPC when authenticated", async () => {
    mockSupabase({ id: "user-123" }, 5);
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.balance).toBe(5);
  });

  it("returns 0 when RPC returns null", async () => {
    mockSupabase({ id: "user-123" }, null);
    const res = await GET();
    const data = await res.json();
    expect(data.balance).toBe(0);
  });
});
