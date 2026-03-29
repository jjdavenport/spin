import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/send-email", () => ({
  sendSubscriptionEmail: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/destination-details", () => ({
  DESTINATION_DETAILS: {
    "1": { unsplash_photo_id: "photo123" },
  },
}));

vi.mock("@/lib/supabase/server", () => ({
  createServiceClient: vi.fn(),
}));

import { POST } from "@/app/api/subscribe/route";
import { createServiceClient } from "@/lib/supabase/server";

function mockSupabase() {
  (createServiceClient as any).mockResolvedValue({
    from: vi.fn().mockImplementation((table: string) => {
      if (table === "email_subscriptions") {
        return {
          upsert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: "sub-1", email: "test@example.com", destination_id: "1" },
                error: null,
              }),
            }),
          }),
        };
      }
      if (table === "destinations") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: "1", name: "Paris", country: "France", description: "City of Light" },
              }),
            }),
          }),
        };
      }
      return {};
    }),
  });
}

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase();
  });

  it("returns success for valid email and destinationId", async () => {
    const res = await POST(
      makeRequest({ email: "test@example.com", destinationId: "1" })
    );
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.subscription).toHaveProperty("id");
    expect(data.subscription).toHaveProperty("email", "test@example.com");
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(
      makeRequest({ email: "bad", destinationId: "1" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({ destinationId: "1" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing destinationId", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 500 on invalid JSON", async () => {
    const req = new Request("http://localhost/api/subscribe", {
      method: "POST",
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
