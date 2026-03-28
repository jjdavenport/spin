"use client";

import { useState, useCallback } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coords: { lat: number; lng: number } | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coords: null,
  });

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: "Geolocation not supported", coords: null });
      return;
    }

    setState({ loading: true, error: null, coords: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (err) => {
        let message = "Unable to detect location";
        if (err.code === err.PERMISSION_DENIED) {
          message = "Location access denied";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Location unavailable";
        } else if (err.code === err.TIMEOUT) {
          message = "Location request timed out";
        }
        setState({ loading: false, error: message, coords: null });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { ...state, detect };
}
