"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Destination } from "@/lib/types";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeProps {
  destinations: Destination[];
  selectedRegion: string | null;
  spinTarget: Destination | null;
  isSpinning: boolean;
  onSpinComplete: () => void;
}

// NASA texture URLs (free, public domain)
const BLUE_MARBLE_URL =
  "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const BUMP_MAP_URL = "//unpkg.com/three-globe/example/img/earth-topology.png";
const NIGHT_SKY_URL = "//unpkg.com/three-globe/example/img/night-sky.png";
const CLOUDS_URL =
  "https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png";

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
  const cloudsRef = useRef<any>(null);
  const frameRef = useRef<number>(0);

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
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Add cloud layer once globe is ready
  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    import("three").then((THREE) => {
      const scene = globe.scene();
      const globeRadius = globe.getGlobeRadius();

      // Cloud sphere — slightly larger than the globe
      const geometry = new THREE.SphereGeometry(
        globeRadius * 1.005,
        64,
        64
      );
      const loader = new THREE.TextureLoader();
      loader.load(CLOUDS_URL, (texture: any) => {
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        cloudsRef.current = mesh;
      });
    });
  }, []);

  // Auto-rotate + animate clouds
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isSpinning;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.minDistance = 150;
        controls.maxDistance = 600;
      }
    }

    // Slowly rotate cloud layer
    const animateClouds = () => {
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.00008;
      }
      frameRef.current = requestAnimationFrame(animateClouds);
    };
    animateClouds();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isSpinning]);

  // Spin animation
  useEffect(() => {
    if (spinTarget && globeRef.current && isSpinning) {
      const randomLng = Math.random() * 360 - 180;
      globeRef.current.pointOfView(
        { lat: Math.random() * 60 - 30, lng: randomLng, altitude: 2.5 },
        1000
      );

      const flyToTarget = setTimeout(() => {
        globeRef.current.pointOfView(
          {
            lat: spinTarget.latitude,
            lng: spinTarget.longitude,
            altitude: 1.8,
          },
          2500
        );
      }, 1200);

      const complete = setTimeout(() => {
        onSpinComplete();
      }, 4000);

      return () => {
        clearTimeout(flyToTarget);
        clearTimeout(complete);
      };
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
          globeImageUrl={BLUE_MARBLE_URL}
          bumpImageUrl={BUMP_MAP_URL}
          backgroundImageUrl={NIGHT_SKY_URL}
          showAtmosphere={true}
          atmosphereColor="#6eb1ff"
          atmosphereAltitude={0.2}
          pointsData={filteredDestinations}
          pointLat={(d: object) => (d as Destination).latitude}
          pointLng={(d: object) => (d as Destination).longitude}
          pointColor={pointColor}
          pointAltitude={(d: object) =>
            spinTarget && (d as Destination).id === spinTarget.id
              ? 0.06
              : 0.02
          }
          pointRadius={(d: object) =>
            spinTarget && (d as Destination).id === spinTarget.id ? 0.6 : 0.3
          }
          pointLabel={(d: object) => {
            const dest = d as Destination;
            return `<div class="text-sm font-medium bg-zinc-900/90 text-white px-2 py-1 rounded">${dest.name}, ${dest.country}</div>`;
          }}
          animateIn={true}
          onGlobeReady={handleGlobeReady}
        />
      )}
    </div>
  );
}
