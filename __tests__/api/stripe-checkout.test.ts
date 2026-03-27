import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreate = vi.fn();

vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: (...args: any[]) => mockCreate(...args),
      },
    },
  },
}));

import { POST } from "@/app/api/stripe/checkout/route";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/stripe/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for invalid packId", async () => {
    const res = await POST(makeRequest({ packId: "invalid" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid pack");
  });

  it("creates checkout session for valid packId", async () => {
    mockCreate.mockResolvedValueOnce({ url: "https://checkout.stripe.com/session123" });
    const res = await POST(makeRequest({ packId: "pack_5" }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.url).toBe("https://checkout.stripe.com/session123");
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        metadata: expect.objectContaining({ credits: "5" }),
      })
    );
  });

  it("returns 500 when stripe throws", async () => {
    mockCreate.mockRejectedValueOnce(new Error("Stripe error"));
    const res = await POST(makeRequest({ packId: "pack_5" }));
    expect(res.status).toBe(500);
  });
});
