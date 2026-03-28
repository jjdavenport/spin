"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Suspense,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  BackSide,
  Group,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  MathUtils,
} from "three";
import {
  earthFragmentShader,
  earthVertexShader,
} from "./earth/earth-shaders";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./earth/atmosphere-shaders";

// Light from the right, tilted 13° upward — matches the waitlist globe.
// Creates a dramatic day/night terminator across the visible face.
const LIGHT_DIR = new Vector3(1, 0, 0).applyAxisAngle(
  new Vector3(0, 0, 1),
  Math.PI * (13 / 180)
);

// Idle rotation speed (rad/s)
// Matches the original UV scroll rate: uTime * 0.005 ≈ 0.005 * 2π rad/s
const IDLE_SPEED = 0.03;
// Fast spin speed (rad/s)
const FAST_SPIN_SPEED = 12;
// Number of extra full rotations before landing
const EXTRA_SPINS = 4;
// Fixed uTime rate for cloud drift (independent of spin)
const CLOUD_DRIFT_RATE = 0.3;
// Max latitude tilt (radians)
const MAX_LAT_TILT = 0.35;

type SpinState =
  | { phase: "idle" }
  | { phase: "spinning"; startTime: number; targetY: number; startY: number; targetTiltX: number }
  | { phase: "decelerating"; targetY: number; targetTiltX: number }
  | { phase: "landed"; targetTiltX: number };

export interface HeroGlobeHandle {
  spin: (targetLat: number, targetLng: number) => void;
  reset: () => void;
}

interface GlobeInnerProps {
  spinStateRef: React.MutableRefObject<SpinState>;
  groupRef: React.MutableRefObject<Group | null>;
}

function GlobeInner({ spinStateRef, groupRef }: GlobeInnerProps) {
  const [dayTex, nightTex, cloudTex] = useLoader(TextureLoader, [
    "/textures/earth-blue-marble-8k.jpg",
    "/textures/earth-night-8k.jpg",
    "/textures/earth-clouds.jpg",
  ]);

  dayTex.colorSpace = nightTex.colorSpace = cloudTex.colorSpace =
    SRGBColorSpace;
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
    // Always advance cloud drift at a constant rate
    earthUniforms.current.uTime.value += delta * CLOUD_DRIFT_RATE;

    const group = groupRef.current;
    if (!group) return;

    const state = spinStateRef.current;

    switch (state.phase) {
      case "idle": {
        // Gentle continuous rotation
        group.rotation.y += delta * IDLE_SPEED;
        // Smoothly return tilt to 0
        group.rotation.x = MathUtils.lerp(group.rotation.x, 0, 1 - Math.pow(0.05, delta));
        break;
      }

      case "spinning": {
        // Fast constant-speed spin for the first ~1.5s
        const elapsed = (performance.now() - state.startTime) / 1000;
        group.rotation.y += delta * FAST_SPIN_SPEED;

        if (elapsed > 1.5) {
          // Transition to deceleration phase
          spinStateRef.current = {
            phase: "decelerating",
            targetY: state.targetY,
            targetTiltX: state.targetTiltX,
          };
        }
        break;
      }

      case "decelerating": {
        // Exponential ease toward target
        const lerpFactor = 1 - Math.pow(0.02, delta);
        group.rotation.y = MathUtils.lerp(group.rotation.y, state.targetY, lerpFactor);

        // Start tilting toward latitude
        group.rotation.x = MathUtils.lerp(group.rotation.x, state.targetTiltX, lerpFactor * 0.5);

        // Check if close enough to snap
        if (Math.abs(group.rotation.y - state.targetY) < 0.002) {
          group.rotation.y = state.targetY;
          spinStateRef.current = {
            phase: "landed",
            targetTiltX: state.targetTiltX,
          };
        }
        break;
      }

      case "landed": {
        // Hold position, continue gentle latitude tilt
        group.rotation.x = MathUtils.lerp(group.rotation.x, state.targetTiltX, 1 - Math.pow(0.05, delta));
        break;
      }
    }
  });

  return (
    <group ref={groupRef}>
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

export const HeroGlobeInteractive = forwardRef<HeroGlobeHandle>(
  function HeroGlobeInteractive(_, ref) {
    const spinStateRef = useRef<SpinState>({ phase: "idle" });
    const groupRef = useRef<Group | null>(null);

    const spin = useCallback((targetLat: number, targetLng: number) => {
      const group = groupRef.current;
      if (!group) return;

      const currentY = group.rotation.y;

      // Three.js SphereGeometry UV mapping:
      //   UV x=0.25 → vertex at (0, y, +r) → faces camera (+Z)
      //   UV x=0.25 maps to longitude -90 in the Blue Marble texture.
      // So at Y rotation = 0, longitude -90 faces the camera.
      // Positive Y rotation moves the view WESTWARD (more negative longitude):
      //   Lng_facing = -90 - Y_rot × (180/π)
      // To bring targetLng to face the camera:
      //   Y_rot = -(targetLng + 90) × π/180
      const TWO_PI = 2 * Math.PI;
      // Normalize target rotation to [0, 2π)
      const targetRot = (((-(targetLng + 90)) * (Math.PI / 180)) % TWO_PI + TWO_PI) % TWO_PI;

      // Find forward offset from current rotation (always spin forward)
      const currentMod = ((currentY % TWO_PI) + TWO_PI) % TWO_PI;
      let offset = targetRot - currentMod;
      if (offset <= 0) offset += TWO_PI;

      const targetY = currentY + EXTRA_SPINS * TWO_PI + offset;

      // Calculate latitude tilt (clamped)
      const targetTiltX = MathUtils.clamp(
        -targetLat * (Math.PI / 180) * 0.4,
        -MAX_LAT_TILT,
        MAX_LAT_TILT
      );

      spinStateRef.current = {
        phase: "spinning",
        startTime: performance.now(),
        targetY,
        startY: currentY,
        targetTiltX,
      };
    }, []);

    const reset = useCallback(() => {
      spinStateRef.current = { phase: "idle" };
    }, []);

    useImperativeHandle(ref, () => ({ spin, reset }));

    return (
      <div className="w-full h-full">
        <Canvas
          camera={{ fov: 40, position: [0, 0, 5] }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <GlobeInner spinStateRef={spinStateRef} groupRef={groupRef} />
          </Suspense>
        </Canvas>
      </div>
    );
  }
);
