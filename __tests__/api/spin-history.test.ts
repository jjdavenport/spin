import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/spin/history/route";

describe("GET /api/spin/history", () => {
  it("returns history as an array", async () => {
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveProperty("history");
    expect(Array.isArray(data.history)).toBe(true);
  });
});
