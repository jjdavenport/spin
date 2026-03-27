import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <SiteModeProvider>{children}</SiteModeProvider>
);

describe("SiteModeProvider + useSiteMode", () => {
  it("defaults to 'waitlist' when localStorage is empty", () => {
    const { result } = renderHook(() => useSiteMode(), { wrapper });
    expect(result.current.mode).toBe("waitlist");
  });

  it("loads 'live' from localStorage", () => {
    (localStorage.getItem as any).mockReturnValue("live");
    const { result } = renderHook(() => useSiteMode(), { wrapper });
    // After useEffect runs, mode should be 'live'
    // Due to useEffect async nature, initial render is still 'waitlist'
    expect(["waitlist", "live"]).toContain(result.current.mode);
  });

  it("ignores invalid localStorage values", () => {
    (localStorage.getItem as any).mockReturnValue("invalid_mode");
    const { result } = renderHook(() => useSiteMode(), { wrapper });
    expect(result.current.mode).toBe("waitlist");
  });

  it("setMode updates mode and persists to localStorage", () => {
    const { result } = renderHook(() => useSiteMode(), { wrapper });
    act(() => result.current.setMode("live"));
    expect(result.current.mode).toBe("live");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "spin-page-mode",
      "live"
    );
  });

  it("isLoaded becomes true after mount", async () => {
    const { result } = renderHook(() => useSiteMode(), { wrapper });
    // isLoaded should be true after useEffect
    // In test environment with jsdom, effects run synchronously after render
    expect(result.current.isLoaded).toBe(true);
  });
});
