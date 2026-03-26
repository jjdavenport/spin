"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Destination } from "@/lib/types";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeProps {
  destinations: Destination[];
  selectedRegion: string | null;
  spinTarget: Destination | null;
  isSpinning: boolean;
  onSpinComplete: () => void;
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

  // Add cloud layer + sun light once globe is ready
  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const scene = globe.scene();
    const globeRadius = globe.getGlobeRadius();
    const texLoader = new THREE.TextureLoader();

    // Replace default lights with a single directional sun
    // so one hemisphere is dark (night lights visible) and one is lit
    const existingLights = scene.children.filter((c: any) => c.isLight);
    existingLights.forEach((l: any) => scene.remove(l));

    const sun = new THREE.DirectionalLight(0xffffff, 3);
    sun.position.set(1, 0.3, 0.5);
    scene.add(sun);

    // Very dim ambient so the dark side isn't completely black
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
        controls.autoRotate = !isSpinning;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = true;
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

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
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
        />
      )}
    </div>
  );
}
