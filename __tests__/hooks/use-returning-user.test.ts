import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock destinations with a controlled array
vi.mock("@/lib/destinations", () => ({
  DESTINATIONS: [
    { id: "1", name: "Paris", country: "France", region: "Europe", latitude: 48.85, longitude: 2.35, description: "City of Light", image_url: null },
    { id: "2", name: "Rome", country: "Italy", region: "Europe", latitude: 41.9, longitude: 12.49, description: "Eternal City", image_url: null },
  ],
}));

import { useReturningUser } from "@/lib/hooks/use-returning-user";

describe("useReturningUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (localStorage as any).clear();
    (sessionStorage as any).clear();
  });

  it("isReturning is false when localStorage has no lastSpinDestinationId", () => {
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.isReturning).toBe(false);
  });

  it("isReturning is true when both localStorage keys present and ID matches", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "lastSpinDestinationId") return "1";
      if (key === "lastSpinTimestamp") return "2025-01-01";
      if (key === "spin-saved-destinations") return "[]";
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.isReturning).toBe(true);
  });

  it("isReturning is false when lastSpinTimestamp is missing", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "lastSpinDestinationId") return "1";
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.isReturning).toBe(false);
  });

  it("lastDestination is the matching Destination object", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "lastSpinDestinationId") return "2";
      if (key === "lastSpinTimestamp") return "2025-01-01";
      if (key === "spin-saved-destinations") return "[]";
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.lastDestination).toEqual(
      expect.objectContaining({ id: "2", name: "Rome" })
    );
  });

  it("lastDestination is null when stored ID does not match any destination", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "lastSpinDestinationId") return "999";
      if (key === "lastSpinTimestamp") return "2025-01-01";
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.lastDestination).toBeNull();
    expect(result.current.isReturning).toBe(false);
  });

  it("savedCount reads from spin-saved-destinations in localStorage", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "spin-saved-destinations") return JSON.stringify(["1", "2", "3"]);
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.savedCount).toBe(3);
  });

  it("savedCount is 0 when localStorage value is corrupted JSON", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "spin-saved-destinations") return "not-json{{{";
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.savedCount).toBe(0);
  });

  it("savedCount is 0 when parsed value is not an array", () => {
    (localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === "spin-saved-destinations") return JSON.stringify({ a: 1 });
      return null;
    });
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.savedCount).toBe(0);
  });

  it("dismissed is false by default", () => {
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.dismissed).toBe(false);
  });

  it("dismissed is true when sessionStorage has returning-user-dismissed", () => {
    (sessionStorage.getItem as any).mockReturnValue("true");
    const { result } = renderHook(() => useReturningUser());
    expect(result.current.dismissed).toBe(true);
  });

  it("dismiss() sets dismissed to true", () => {
    const { result } = renderHook(() => useReturningUser());
    act(() => result.current.dismiss());
    expect(result.current.dismissed).toBe(true);
  });

  it("dismiss() writes to sessionStorage", () => {
    const { result } = renderHook(() => useReturningUser());
    act(() => result.current.dismiss());
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "returning-user-dismissed",
      "true"
    );
  });
});
