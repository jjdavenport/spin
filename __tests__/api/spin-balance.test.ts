import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/spin/balance/route";

describe("GET /api/spin/balance", () => {
  it("returns balance as a number", async () => {
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveProperty("balance");
    expect(typeof data.balance).toBe("number");
  });
});
