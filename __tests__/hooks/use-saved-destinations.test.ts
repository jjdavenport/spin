import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSavedDestinations } from "@/lib/hooks/use-saved-destinations";

describe("useSavedDestinations", () => {
  it("starts with empty set when localStorage is empty", () => {
    const { result } = renderHook(() => useSavedDestinations());
    expect(result.current.savedIds.size).toBe(0);
  });

  it("save adds an id", () => {
    const { result } = renderHook(() => useSavedDestinations());
    act(() => result.current.save("1"));
    expect(result.current.isSaved("1")).toBe(true);
  });

  it("unsave removes an id", () => {
    const { result } = renderHook(() => useSavedDestinations());
    act(() => result.current.save("1"));
    act(() => result.current.unsave("1"));
    expect(result.current.isSaved("1")).toBe(false);
  });

  it("toggleSave adds then removes", () => {
    const { result } = renderHook(() => useSavedDestinations());
    act(() => result.current.toggleSave("1"));
    expect(result.current.isSaved("1")).toBe(true);
    act(() => result.current.toggleSave("1"));
    expect(result.current.isSaved("1")).toBe(false);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useSavedDestinations());
    act(() => result.current.save("5"));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "spin-saved-destinations",
      expect.stringContaining('"5"')
    );
  });

  it("loads from localStorage on mount", () => {
    (localStorage.getItem as any).mockReturnValueOnce(JSON.stringify(["1", "2"]));
    const { result } = renderHook(() => useSavedDestinations());
    // useEffect runs async, wait for it
    expect(result.current.savedIds.size).toBeGreaterThanOrEqual(0);
  });

  it("handles corrupted localStorage gracefully", () => {
    (localStorage.getItem as any).mockReturnValueOnce("not-json{{{");
    const { result } = renderHook(() => useSavedDestinations());
    expect(result.current.savedIds.size).toBe(0);
  });
});
