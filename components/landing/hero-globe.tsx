"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import {
  BackSide,
  Group,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";

// Earth rotation: ~2.5 min per revolution — slow enough to feel majestic,
// fast enough to be noticeable. Real Earth is 24h; this is ~580× sped up,
// similar to time-lapse ISS footage.
const EARTH_ROTATION_SPEED = 0.04; // rad/s

// Cloud drift rate relative to real-time. Multiplied by the shader's 0.005
// UV/s factor, this gives ~0.0003 UV/s — clouds complete a full wrap in
// ~55 min, roughly 5% of the globe rotation speed (matching real jet-stream
// proportions relative to Earth's rotation).
const CLOUD_DRIFT_RATE = 0.06;
import { earthFragmentShader, earthVertexShader } from "./earth/earth-shaders";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./earth/atmosphere-shaders";

const LIGHT_DIR = new Vector3(1, 0, 0).applyAxisAngle(
  new Vector3(0, 0, 1),
  Math.PI * (13 / 180)
);

function GlobeLoaded({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

function Globe({ onReady }: { onReady: () => void }) {
  const groupRef = useRef<Group>(null);
  const [dayTex, nightTex, cloudTex] = useLoader(TextureLoader, [
    "/textures/earth-blue-marble-8k.jpg",
    "/textures/earth-night-8k.jpg",
    "/textures/earth-clouds.jpg",
  ]);

  dayTex.colorSpace = nightTex.colorSpace = cloudTex.colorSpace = SRGBColorSpace;
  dayTex.wrapS = nightTex.wrapS = cloudTex.wrapS = RepeatWrapping;

  const earthUniforms = useRef({
    dayMap: { value: dayTex },
    nightMap: { value: nightTex },
    cloudMap: { value: cloudTex },
    uTime: { value: 0 },
    lightDirection: { value: LIGHT_DIR.clone() },
  });

  const atmosUniforms = useRef({
    lightDirection: { value: LIGHT_DIR.clone() },
  });

  useFrame((_, delta) => {
    // Rotate the entire globe slowly (earth + atmosphere together)
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * EARTH_ROTATION_SPEED;
    }
    // Advance cloud drift at a realistic fraction of globe rotation
    earthUniforms.current.uTime.value += delta * CLOUD_DRIFT_RATE;
  });

  return (
    <group ref={groupRef}>
      <GlobeLoaded onReady={onReady} />
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[1, 200, 200]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={earthUniforms.current}
        />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 200, 200]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosUniforms.current}
          side={BackSide}
          transparent
        />
      </mesh>
    </group>
  );
}

export function HeroGlobe() {
  const [loaded, setLoaded] = useState(false);
  const handleReady = useCallback(() => setLoaded(true), []);

  return (
    <div
      className={`w-full h-full ${loaded ? "animate-reveal-scale-up" : "opacity-0"}`}
    >
      <Canvas
        camera={{ fov: 40, position: [0, 0, 5] }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <Globe onReady={handleReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
