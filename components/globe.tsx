"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Destination, SpinPhase } from "@/lib/types";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeProps {
  destinations: Destination[];
  selectedRegion: string | null;
  spinTarget: Destination | null;
  phase: SpinPhase;
  onPhaseChange: (phase: SpinPhase) => void;
}

// Self-hosted high-res NASA textures (public domain)
const BLUE_MARBLE_URL = "/textures/earth-blue-marble-8k.jpg";
const NIGHT_LIGHTS_URL = "/textures/earth-night-8k.jpg";
const BUMP_MAP_URL = "/textures/earth-topology.png";
const WATER_MAP_URL = "/textures/earth-water.png";
const CLOUDS_URL = "/textures/clouds.png";
const NIGHT_SKY_URL =
  "//unpkg.com/three-globe/example/img/night-sky.png";

// Lazily build the globe material (must be client-side only)
let _globeMaterial: THREE.MeshPhongMaterial | null = null;
function getGlobeMaterial() {
  if (_globeMaterial) return _globeMaterial;
  const loader = new THREE.TextureLoader();

  const globeTexture = loader.load(BLUE_MARBLE_URL);
  globeTexture.colorSpace = THREE.SRGBColorSpace;

  const nightTexture = loader.load(NIGHT_LIGHTS_URL);
  nightTexture.colorSpace = THREE.SRGBColorSpace;

  const bumpTexture = loader.load(BUMP_MAP_URL);
  const waterTexture = loader.load(WATER_MAP_URL);

  _globeMaterial = new THREE.MeshPhongMaterial({
    map: globeTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.5,
    emissiveMap: nightTexture,
    emissive: new THREE.Color(0xffaa44),
    emissiveIntensity: 0.08,
    specularMap: waterTexture,
    specular: new THREE.Color(0x666688),
    shininess: 20,
  });
  return _globeMaterial;
}

export default function Globe({
  destinations,
  selectedRegion,
  spinTarget,
  phase,
  onPhaseChange,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const [markerData, setMarkerData] = useState<Destination[]>([]);

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

  // Add cloud layer + sun light once globe is ready
  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const scene = globe.scene();
    const globeRadius = globe.getGlobeRadius();
    const texLoader = new THREE.TextureLoader();

    // Replace default lights with a single directional sun
    const existingLights = scene.children.filter((c: any) => c.isLight);
    existingLights.forEach((l: any) => scene.remove(l));

    const sun = new THREE.DirectionalLight(0xffffff, 3);
    sun.position.set(1, 0.3, 0.5);
    scene.add(sun);

    const ambient = new THREE.AmbientLight(0x111122, 0.3);
    scene.add(ambient);

    // Cloud layer
    const cloudGeo = new THREE.SphereGeometry(globeRadius * 1.005, 64, 64);
    texLoader.load(CLOUDS_URL, (cloudTex) => {
      const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      scene.add(cloudMesh);
      cloudsRef.current = cloudMesh;
    });

    // Atmosphere glow (outer halo)
    const glowGeo = new THREE.SphereGeometry(globeRadius * 1.15, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x4d9fff) },
        viewVector: { value: new THREE.Vector3(0, 0, 1) },
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.65 - dot(vNormal, vNormel), 3.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          gl_FragColor = vec4(glowColor, intensity * 0.6);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);
  }, []);

  // Auto-rotate + animate clouds
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        const isAnimating = phase === "spinning" || phase === "revealing";
        controls.autoRotate = phase === "idle";
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = !isAnimating;
        controls.enableRotate = !isAnimating;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.minDistance = 150;
        controls.maxDistance = 600;
      }
    }

    const animateClouds = () => {
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.00008;
      }
      frameRef.current = requestAnimationFrame(animateClouds);
    };
    animateClouds();
    return () => cancelAnimationFrame(frameRef.current);
  }, [phase]);

  // Multi-step spin animation
  useEffect(() => {
    if (!spinTarget || !globeRef.current || phase !== "spinning") return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Clear marker during spin
    setMarkerData([]);

    // Step 1 (0-500ms): Whip to random far point
    const randomLat1 = Math.random() * 120 - 60;
    const randomLng1 = Math.random() * 360 - 180;
    globeRef.current.pointOfView(
      { lat: randomLat1, lng: randomLng1, altitude: 3.0 },
      500
    );

    // Step 2 (500-1200ms): Fly through intermediate point
    timeouts.push(
      setTimeout(() => {
        if (!globeRef.current) return;
        const randomLat2 = Math.random() * 100 - 50;
        const randomLng2 = Math.random() * 360 - 180;
        globeRef.current.pointOfView(
          { lat: randomLat2, lng: randomLng2, altitude: 2.5 },
          700
        );
      }, 500)
    );

    // Step 3 (1200-3200ms): Fly to target with deceleration
    timeouts.push(
      setTimeout(() => {
        if (!globeRef.current) return;
        globeRef.current.pointOfView(
          {
            lat: spinTarget.latitude,
            lng: spinTarget.longitude,
            altitude: 1.8,
          },
          2000
        );
      }, 1200)
    );

    // Step 4 (3200-4500ms): Slow zoom in for reveal close-up
    timeouts.push(
      setTimeout(() => {
        if (!globeRef.current) return;
        // Show marker as we arrive
        setMarkerData([spinTarget]);
        globeRef.current.pointOfView(
          {
            lat: spinTarget.latitude,
            lng: spinTarget.longitude,
            altitude: 0.8,
          },
          1300
        );
        onPhaseChange("revealing");
      }, 3200)
    );

    // Step 5 (5000ms): Reveal complete
    timeouts.push(
      setTimeout(() => {
        onPhaseChange("revealed");
      }, 5000)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [spinTarget, phase, onPhaseChange]);

  // Clear marker when resetting
  useEffect(() => {
    if (phase === "idle") {
      setMarkerData([]);
    }
  }, [phase]);

  // Custom HTML marker element
  const markerElement = useCallback((d: any) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="
          width: 12px; height: 12px;
          background: #f43f5e;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(244, 63, 94, 0.6);
          animation: marker-drop 0.5s ease-out both;
        "></div>
        <div style="
          position: absolute; top: 50%; left: 50%;
          width: 24px; height: 24px;
          margin-left: -12px; margin-top: -12px;
          border: 2px solid rgba(244, 63, 94, 0.5);
          border-radius: 50%;
          animation: pulse-ring 1.5s ease-out infinite;
        "></div>
      </div>
    `;
    return el;
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px]">
      {dimensions.width > 0 && (
        <ReactGlobe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeMaterial={getGlobeMaterial()}
          backgroundImageUrl={NIGHT_SKY_URL}
          showAtmosphere={true}
          atmosphereColor="#6eb1ff"
          atmosphereAltitude={0.18}
          animateIn={true}
          onGlobeReady={handleGlobeReady}
          htmlElementsData={markerData}
          htmlLat={(d: any) => d.latitude}
          htmlLng={(d: any) => d.longitude}
          htmlElement={markerElement}
          htmlAltitude={0.01}
        />
      )}
    </div>
  );
}
