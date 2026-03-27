import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useShare } from "@/lib/hooks/use-share";
import type { Destination } from "@/lib/types";

const mockDestination: Destination = {
  id: "1",
  name: "Paris",
  country: "France",
  region: "Europe",
  latitude: 48.8566,
  longitude: 2.3522,
  description: "The City of Light",
  image_url: null,
};

describe("useShare", () => {
  beforeEach(() => {
    // Remove navigator.share by default
    Object.defineProperty(navigator, "share", {
      value: undefined,
      writable: true,
      configurable: true,
    });
  });

  it("canNativeShare is false when navigator.share is undefined", () => {
    const { result } = renderHook(() => useShare());
    expect(result.current.canNativeShare).toBe(false);
  });

  it("canNativeShare is true when navigator.share exists", () => {
    Object.defineProperty(navigator, "share", {
      value: vi.fn().mockResolvedValue(undefined),
      writable: true,
      configurable: true,
    });
    const { result } = renderHook(() => useShare());
    expect(result.current.canNativeShare).toBe(true);
  });

  it("falls back to clipboard when navigator.share is undefined", async () => {
    const { result } = renderHook(() => useShare());
    let outcome: string;
    await act(async () => {
      outcome = await result.current.share(mockDestination);
    });
    expect(outcome!).toBe("copied");
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("returns 'shared' when native share succeeds", async () => {
    Object.defineProperty(navigator, "share", {
      value: vi.fn().mockResolvedValue(undefined),
      writable: true,
      configurable: true,
    });
    const { result } = renderHook(() => useShare());
    let outcome: string;
    await act(async () => {
      outcome = await result.current.share(mockDestination);
    });
    expect(outcome!).toBe("shared");
  });

  it("returns 'failed' on AbortError from native share", async () => {
    const abortError = new Error("User cancelled");
    abortError.name = "AbortError";
    Object.defineProperty(navigator, "share", {
      value: vi.fn().mockRejectedValue(abortError),
      writable: true,
      configurable: true,
    });
    const { result } = renderHook(() => useShare());
    let outcome: string;
    await act(async () => {
      outcome = await result.current.share(mockDestination);
    });
    expect(outcome!).toBe("failed");
  });

  it("falls to clipboard on non-abort share error", async () => {
    Object.defineProperty(navigator, "share", {
      value: vi.fn().mockRejectedValue(new Error("NotAllowedError")),
      writable: true,
      configurable: true,
    });
    const { result } = renderHook(() => useShare());
    let outcome: string;
    await act(async () => {
      outcome = await result.current.share(mockDestination);
    });
    expect(outcome!).toBe("copied");
  });

  it("returns 'failed' when both share and clipboard fail", async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(
      new Error("clipboard failed")
    );
    const { result } = renderHook(() => useShare());
    let outcome: string;
    await act(async () => {
      outcome = await result.current.share(mockDestination);
    });
    expect(outcome!).toBe("failed");
  });
});
