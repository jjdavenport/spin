import { describe, it, expect, beforeEach, vi } from "vitest";

// Helper to get a fresh module instance (avoids cross-test state leakage)
async function freshMockData() {
  vi.resetModules();
  return await import("@/lib/mock-data");
}

describe("credit system", () => {
  it("initial balance is 3", async () => {
    const m = await freshMockData();
    expect(m.getMockBalance()).toBe(3);
  });

  it("deductMockCredit decrements by 1", async () => {
    const m = await freshMockData();
    expect(m.deductMockCredit()).toBe(true);
    expect(m.getMockBalance()).toBe(2);
  });

  it("deductMockCredit returns false at zero balance", async () => {
    const m = await freshMockData();
    m.deductMockCredit(); // 2
    m.deductMockCredit(); // 1
    m.deductMockCredit(); // 0
    expect(m.deductMockCredit()).toBe(false);
    expect(m.getMockBalance()).toBe(0);
  });

  it("addMockCredits increases balance", async () => {
    const m = await freshMockData();
    m.addMockCredits(10);
    expect(m.getMockBalance()).toBe(13);
  });

  it("deduct all then add then deduct sequence", async () => {
    const m = await freshMockData();
    m.deductMockCredit();
    m.deductMockCredit();
    m.deductMockCredit();
    expect(m.getMockBalance()).toBe(0);
    m.addMockCredits(5);
    m.deductMockCredit();
    m.deductMockCredit();
    m.deductMockCredit();
    expect(m.getMockBalance()).toBe(2);
  });
});

describe("getRandomDestination", () => {
  it("returns a destination object", async () => {
    const m = await freshMockData();
    const dest = m.getRandomDestination();
    expect(dest).toHaveProperty("id");
    expect(dest).toHaveProperty("name");
    expect(dest).toHaveProperty("country");
    expect(dest).toHaveProperty("region");
  });

  it("filters by region", async () => {
    const m = await freshMockData();
    for (let i = 0; i < 20; i++) {
      const dest = m.getRandomDestination("Europe");
      expect(dest.region).toBe("Europe");
    }
  });

  it("'All Regions' returns any destination", async () => {
    const m = await freshMockData();
    const dest = m.getRandomDestination("All Regions");
    expect(dest).toHaveProperty("id");
  });

  it("returns first item when Math.random returns 0", async () => {
    const m = await freshMockData();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const dest = m.getRandomDestination();
    expect(dest.id).toBe("1"); // Paris is first
    vi.restoreAllMocks();
  });

  it("returns last item when Math.random returns 0.999", async () => {
    const m = await freshMockData();
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const dest = m.getRandomDestination();
    expect(dest.id).toBe(String(m.DESTINATIONS.length));
    vi.restoreAllMocks();
  });
});

describe("spin history", () => {
  it("addMockSpinHistory returns correct shape", async () => {
    const m = await freshMockData();
    const dest = m.DESTINATIONS[0];
    const entry = m.addMockSpinHistory(dest, "Europe");
    expect(entry).toHaveProperty("id");
    expect(entry).toHaveProperty("user_id", "mock-user");
    expect(entry).toHaveProperty("destination_id", dest.id);
    expect(entry).toHaveProperty("region_filter", "Europe");
    expect(entry).toHaveProperty("created_at");
    expect(entry).toHaveProperty("destination", dest);
  });

  it("history is ordered newest-first", async () => {
    const m = await freshMockData();
    const entry1 = m.addMockSpinHistory(m.DESTINATIONS[0], null);
    const entry2 = m.addMockSpinHistory(m.DESTINATIONS[1], null);
    const history = m.getMockHistory();
    expect(history[0].id).toBe(entry2.id);
    expect(history[1].id).toBe(entry1.id);
  });
});

describe("waitlist", () => {
  it("adds entry and increments count", async () => {
    const m = await freshMockData();
    const initialCount = m.getMockWaitlistCount();
    m.addMockWaitlistEntry("test@example.com");
    expect(m.getMockWaitlistCount()).toBe(initialCount + 1);
  });

  it("duplicate email returns existing entry without incrementing count", async () => {
    const m = await freshMockData();
    const entry1 = m.addMockWaitlistEntry("dup@example.com");
    const countAfterFirst = m.getMockWaitlistCount();
    const entry2 = m.addMockWaitlistEntry("dup@example.com");
    expect(entry2.id).toBe(entry1.id);
    expect(m.getMockWaitlistCount()).toBe(countAfterFirst);
  });

  it("base count is 2847", async () => {
    const m = await freshMockData();
    expect(m.getMockWaitlistCount()).toBe(2847);
  });
});

describe("saved destinations", () => {
  it("save and check", async () => {
    const m = await freshMockData();
    expect(m.isMockDestinationSaved("1")).toBe(false);
    m.saveMockDestination("1");
    expect(m.isMockDestinationSaved("1")).toBe(true);
  });

  it("unsave removes destination", async () => {
    const m = await freshMockData();
    m.saveMockDestination("1");
    m.unsaveMockDestination("1");
    expect(m.isMockDestinationSaved("1")).toBe(false);
  });

  it("getMockSavedDestinations returns array of saved ids", async () => {
    const m = await freshMockData();
    m.saveMockDestination("1");
    m.saveMockDestination("5");
    const saved = m.getMockSavedDestinations();
    expect(saved).toContain("1");
    expect(saved).toContain("5");
    expect(saved).toHaveLength(2);
  });
});

describe("email subscriptions", () => {
  it("adds subscription", async () => {
    const m = await freshMockData();
    const sub = m.addMockEmailSubscription("test@example.com", "1");
    expect(sub).toHaveProperty("id");
    expect(sub).toHaveProperty("email", "test@example.com");
    expect(sub).toHaveProperty("destination_id", "1");
  });

  it("deduplicates by email + destination_id", async () => {
    const m = await freshMockData();
    const sub1 = m.addMockEmailSubscription("a@b.com", "1");
    const sub2 = m.addMockEmailSubscription("a@b.com", "1");
    expect(sub2.id).toBe(sub1.id);
  });

  it("same email with different destination creates new entry", async () => {
    const m = await freshMockData();
    const sub1 = m.addMockEmailSubscription("a@b.com", "1");
    const sub2 = m.addMockEmailSubscription("a@b.com", "2");
    expect(sub2.id).not.toBe(sub1.id);
  });
});
