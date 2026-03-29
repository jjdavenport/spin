import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/send-email", () => ({
  sendSpinResultEmail: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/destination-details", () => ({
  DESTINATION_DETAILS: {
    "1": {
      unsplash_photo_id: "photo123",
      airport_code: "CDG",
      best_time_to_visit: "Spring",
      highlights: ["Eiffel Tower"],
      budget_range: { low: 100, high: 300, currency: "EUR" },
    },
  },
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { POST } from "@/app/api/spin/route";
import { sendSpinResultEmail } from "@/lib/send-email";
import { createClient } from "@/lib/supabase/server";

const MOCK_DESTINATION = {
  id: "1",
  name: "Paris",
  country: "France",
  region: "Europe",
  description: "City of Light",
};

function createThenable(data: any) {
  const obj: any = {};
  obj.select = vi.fn().mockReturnValue(obj);
  obj.eq = vi.fn().mockReturnValue(obj);
  obj.in = vi.fn().mockReturnValue(obj);
  obj.then = (resolve: any) =>
    Promise.resolve({ data, error: null }).then(resolve);
  return obj;
}

function mockSupabase(options: {
  authenticated?: boolean;
  balance?: number;
  newBalance?: number;
  destinations?: any[];
  deductError?: boolean;
} = {}) {
  const {
    authenticated = true,
    balance = 3,
    newBalance,
    destinations = [MOCK_DESTINATION],
    deductError = false,
  } = options;

  const client = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: authenticated ? { id: "user-123" } : null },
      }),
    },
    rpc: vi.fn()
      .mockResolvedValueOnce({ data: balance })
      .mockResolvedValueOnce({ data: newBalance ?? balance - 1 }),
    from: vi.fn().mockImplementation((table: string) => {
      if (table === "credit_ledger") {
        return {
          insert: vi.fn().mockResolvedValue({
            error: deductError ? { message: "DB error" } : null,
          }),
        };
      }
      if (table === "destinations") {
        return createThenable(destinations);
      }
      if (table === "spin_history") {
        return { insert: vi.fn().mockResolvedValue({ error: null }) };
      }
      return {};
    }),
  };
  (createClient as any).mockResolvedValue(client);
  return client;
}

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/spin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/spin", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns destination and remaining credits on valid spin", async () => {
    mockSupabase({ balance: 3, newBalance: 2 });
    const res = await POST(makeRequest({}));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveProperty("destination");
    expect(data).toHaveProperty("remainingCredits");
    expect(data.destination).toHaveProperty("id");
    expect(data.destination).toHaveProperty("name");
  });

  it("returns 401 when not authenticated", async () => {
    mockSupabase({ authenticated: false });
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(401);
  });

  it("returns 402 when credits are exhausted", async () => {
    mockSupabase({ balance: 0 });
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(402);
    const data = await res.json();
    expect(data.error).toContain("Insufficient credits");
  });

  it("sends email when email is provided and details exist", async () => {
    mockSupabase({ balance: 3 });
    await POST(makeRequest({ email: "test@example.com" }));
    expect(sendSpinResultEmail).toHaveBeenCalledWith(
      "test@example.com",
      expect.objectContaining({
        destinationName: expect.any(String),
        country: expect.any(String),
      })
    );
  });

  it("does not send email when email is not provided", async () => {
    mockSupabase({ balance: 3 });
    await POST(makeRequest({}));
    expect(sendSpinResultEmail).not.toHaveBeenCalled();
  });

  it("returns 500 on invalid JSON body", async () => {
    const req = new Request("http://localhost/api/spin", {
      method: "POST",
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("returns 500 when credit deduction fails", async () => {
    mockSupabase({ balance: 3, deductError: true });
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(500);
  });
});
