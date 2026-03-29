import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { GET } from "@/app/api/spin/history/route";
import { createClient } from "@/lib/supabase/server";

function createQueryBuilder(data: any) {
  const builder: any = {};
  builder.select = vi.fn().mockReturnValue(builder);
  builder.eq = vi.fn().mockReturnValue(builder);
  builder.order = vi.fn().mockResolvedValue({ data });
  return builder;
}

function mockSupabase(user: { id: string } | null, historyData: any[] = []) {
  (createClient as any).mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
    from: vi.fn().mockReturnValue(createQueryBuilder(historyData)),
  });
}

describe("GET /api/spin/history", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns empty history when not authenticated", async () => {
    mockSupabase(null);
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.history).toEqual([]);
  });

  it("returns history as an array", async () => {
    mockSupabase({ id: "user-123" }, []);
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data.history)).toBe(true);
  });

  it("reshapes destinations field to destination", async () => {
    mockSupabase({ id: "user-123" }, [
      {
        id: "h1",
        user_id: "user-123",
        destination_id: "1",
        region_filter: "Europe",
        created_at: "2025-01-01",
        destinations: { id: "1", name: "Paris", country: "France" },
      },
    ]);
    const res = await GET();
    const data = await res.json();
    expect(data.history).toHaveLength(1);
    expect(data.history[0]).toHaveProperty("destination");
    expect(data.history[0].destination.name).toBe("Paris");
    expect(data.history[0]).not.toHaveProperty("destinations");
  });
});
