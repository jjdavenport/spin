import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock send-email before importing route
vi.mock("@/lib/send-email", () => ({
  sendSpinResultEmail: vi.fn().mockResolvedValue(null),
}));

// Mock destination-details to avoid loading full data
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

import { POST } from "@/app/api/spin/route";
import { sendSpinResultEmail } from "@/lib/send-email";
import { addMockCredits, getMockBalance } from "@/lib/mock-data";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/spin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/spin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure we have credits for each test by topping up
    const currentBalance = getMockBalance();
    if (currentBalance < 3) {
      addMockCredits(3 - currentBalance);
    }
  });

  it("returns destination and remaining credits on valid spin", async () => {
    const res = await POST(makeRequest({}));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveProperty("destination");
    expect(data).toHaveProperty("remainingCredits");
    expect(data.destination).toHaveProperty("id");
    expect(data.destination).toHaveProperty("name");
  });

  it("decrements credits with each spin", async () => {
    const balanceBefore = getMockBalance();
    const res = await POST(makeRequest({}));
    const data = await res.json();
    expect(data.remainingCredits).toBe(balanceBefore - 1);
  });

  it("returns 402 when credits are exhausted", async () => {
    // Exhaust all credits
    while (getMockBalance() > 0) {
      await POST(makeRequest({}));
    }
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(402);
    const data = await res.json();
    expect(data.error).toContain("Insufficient credits");
  });

  it("sends email when email is provided and details exist", async () => {
    // Force destination to be Paris (id: "1") which has mocked details
    vi.spyOn(Math, "random").mockReturnValue(0);
    await POST(makeRequest({ email: "test@example.com" }));
    expect(sendSpinResultEmail).toHaveBeenCalledWith(
      "test@example.com",
      expect.objectContaining({
        destinationName: expect.any(String),
        country: expect.any(String),
      })
    );
    vi.restoreAllMocks();
  });

  it("does not send email when email is not provided", async () => {
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
});
