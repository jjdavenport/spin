import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/send-email", () => ({
  sendWaitlistEmail: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/supabase/server", () => ({
  createServiceClient: vi.fn(),
}));

import { POST } from "@/app/api/waitlist/route";
import { sendWaitlistEmail } from "@/lib/send-email";
import { createServiceClient } from "@/lib/supabase/server";

function mockSupabase() {
  (createServiceClient as any).mockResolvedValue({
    from: vi.fn().mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ error: null }),
      select: vi.fn().mockResolvedValue({ count: 1 }),
    }),
  });
}

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase();
  });

  it("returns success with position for valid email", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(typeof data.position).toBe("number");
    expect(data.position).toBeGreaterThanOrEqual(2847);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("sends waitlist email on success", async () => {
    await POST(makeRequest({ email: "hello@test.com" }));
    expect(sendWaitlistEmail).toHaveBeenCalledWith(
      "hello@test.com",
      expect.any(Number)
    );
  });
});
