import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGeolocation } from "@/lib/hooks/use-geolocation";

// Helper to set up a mock geolocation object
function mockGeolocation(impl?: Partial<Geolocation>) {
  Object.defineProperty(navigator, "geolocation", {
    value: impl
      ? {
          getCurrentPosition: vi.fn(),
          watchPosition: vi.fn(),
          clearWatch: vi.fn(),
          ...impl,
        }
      : undefined,
    writable: true,
    configurable: true,
  });
}

describe("useGeolocation", () => {
  beforeEach(() => {
    // Restore geolocation to a default mock
    mockGeolocation({});
  });

  it("initial state is idle", () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.coords).toBeNull();
  });

  it("sets loading to true after calling detect()", () => {
    // Never call callbacks so loading stays true
    mockGeolocation({ getCurrentPosition: vi.fn() });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.loading).toBe(true);
  });

  it("sets coords on successful geolocation", () => {
    mockGeolocation({
      getCurrentPosition: vi.fn((success) => {
        success({
          coords: { latitude: 40.7128, longitude: -74.006 },
        } as GeolocationPosition);
      }),
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.loading).toBe(false);
    expect(result.current.coords).toEqual({ lat: 40.7128, lng: -74.006 });
    expect(result.current.error).toBeNull();
  });

  it("sets 'Location access denied' on PERMISSION_DENIED", () => {
    mockGeolocation({
      getCurrentPosition: vi.fn((_success, error) => {
        error!({
          code: 1, // PERMISSION_DENIED
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: "",
        } as GeolocationPositionError);
      }),
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.error).toBe("Location access denied");
  });

  it("sets 'Location unavailable' on POSITION_UNAVAILABLE", () => {
    mockGeolocation({
      getCurrentPosition: vi.fn((_success, error) => {
        error!({
          code: 2, // POSITION_UNAVAILABLE
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: "",
        } as GeolocationPositionError);
      }),
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.error).toBe("Location unavailable");
  });

  it("sets 'Location request timed out' on TIMEOUT", () => {
    mockGeolocation({
      getCurrentPosition: vi.fn((_success, error) => {
        error!({
          code: 3, // TIMEOUT
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: "",
        } as GeolocationPositionError);
      }),
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.error).toBe("Location request timed out");
  });

  it("sets 'Unable to detect location' on unknown error code", () => {
    mockGeolocation({
      getCurrentPosition: vi.fn((_success, error) => {
        error!({
          code: 99,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: "",
        } as GeolocationPositionError);
      }),
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.error).toBe("Unable to detect location");
  });

  it("sets 'Geolocation not supported' when navigator.geolocation is undefined", () => {
    mockGeolocation(); // sets geolocation to undefined
    const { result } = renderHook(() => useGeolocation());
    act(() => result.current.detect());
    expect(result.current.error).toBe("Geolocation not supported");
    expect(result.current.loading).toBe(false);
  });
});
