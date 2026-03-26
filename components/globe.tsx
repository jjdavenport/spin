"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Destination } from "@/lib/types";
import { DESTINATIONS } from "@/lib/mock-data";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeProps {
  destinations: Destination[];
  selectedRegion: string | null;
  spinTarget: Destination | null;
  isSpinning: boolean;
  onSpinComplete: () => void;
}

export default function Globe({
  destinations,
  selectedRegion,
  spinTarget,
  isSpinning,
  onSpinComplete,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isSpinning;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
      }
    }
  }, [isSpinning]);

  // Spin animation
  useEffect(() => {
    if (spinTarget && globeRef.current && isSpinning) {
      // First do a fast rotation (simulate spinning)
      const randomLng = Math.random() * 360 - 180;
      globeRef.current.pointOfView(
        { lat: Math.random() * 60 - 30, lng: randomLng, altitude: 2.5 },
        1000
      );

      // Then animate to the target
      setTimeout(() => {
        globeRef.current.pointOfView(
          {
            lat: spinTarget.latitude,
            lng: spinTarget.longitude,
            altitude: 1.8,
          },
          2500
        );
      }, 1200);

      // Signal completion
      setTimeout(() => {
        onSpinComplete();
      }, 4000);
    }
  }, [spinTarget, isSpinning, onSpinComplete]);

  const filteredDestinations =
    selectedRegion && selectedRegion !== "All Regions"
      ? destinations.filter((d) => d.region === selectedRegion)
      : destinations;

  const pointColor = useCallback(
    (d: object) => {
      const dest = d as Destination;
      if (spinTarget && dest.id === spinTarget.id) return "#22c55e";
      if (selectedRegion && selectedRegion !== "All Regions") {
        return dest.region === selectedRegion ? "#3b82f6" : "#374151";
      }
      return "#3b82f6";
    },
    [spinTarget, selectedRegion]
  );

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {dimensions.width > 0 && (
        <ReactGlobe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={filteredDestinations}
          pointLat={(d: object) => (d as Destination).latitude}
          pointLng={(d: object) => (d as Destination).longitude}
          pointColor={pointColor}
          pointAltitude={(d: object) =>
            spinTarget && (d as Destination).id === spinTarget.id ? 0.06 : 0.02
          }
          pointRadius={(d: object) =>
            spinTarget && (d as Destination).id === spinTarget.id ? 0.6 : 0.3
          }
          pointLabel={(d: object) => {
            const dest = d as Destination;
            return `<div class="text-sm font-medium bg-zinc-900/90 text-white px-2 py-1 rounded">${dest.name}, ${dest.country}</div>`;
          }}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          animateIn={true}
        />
      )}
    </div>
  );
}
