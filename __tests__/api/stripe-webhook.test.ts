import { describe, it, expect, vi, beforeEach } from "vitest";

const mockConstructEvent = vi.fn();
const mockAddMockCredits = vi.fn();

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent: (...args: any[]) => mockConstructEvent(...args),
    },
  },
}));

vi.mock("@/lib/mock-data", () => ({
  addMockCredits: (...args: any[]) => mockAddMockCredits(...args),
}));

import { POST } from "@/app/api/stripe/webhook/route";

function makeWebhookRequest(body: string, signature?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (signature) headers["stripe-signature"] = signature;
  return new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    headers,
    body,
  });
}

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
  });

  it("returns 400 when signature is missing", async () => {
    const res = await POST(makeWebhookRequest("{}", undefined));
    expect(res.status).toBe(400);
  });

  it("returns 400 when STRIPE_WEBHOOK_SECRET is missing", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const res = await POST(makeWebhookRequest("{}", "sig_test"));
    expect(res.status).toBe(400);
  });

  it("returns 400 when constructEvent throws", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });
    const res = await POST(makeWebhookRequest("{}", "sig_test"));
    expect(res.status).toBe(400);
  });

  it("adds credits on checkout.session.completed", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: { credits: "20" },
        },
      },
    });
    const res = await POST(makeWebhookRequest("{}", "sig_test"));
    expect(res.status).toBe(200);
    expect(mockAddMockCredits).toHaveBeenCalledWith(20);
  });

  it("does not add credits for non-checkout events", async () => {
    mockConstructEvent.mockReturnValue({
      type: "payment_intent.succeeded",
      data: { object: {} },
    });
    const res = await POST(makeWebhookRequest("{}", "sig_test"));
    expect(res.status).toBe(200);
    expect(mockAddMockCredits).not.toHaveBeenCalled();
  });

  it("does not add credits when metadata credits is 0", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: { credits: "0" },
        },
      },
    });
    const res = await POST(makeWebhookRequest("{}", "sig_test"));
    expect(res.status).toBe(200);
    expect(mockAddMockCredits).not.toHaveBeenCalled();
  });
});
