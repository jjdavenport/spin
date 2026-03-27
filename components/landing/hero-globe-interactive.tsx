"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, forwardRef, useImperativeHandle } from "react";
import {
  BackSide,
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

const LIGHT_DIR = new Vector3(1, 0, 0).applyAxisAngle(
  new Vector3(0, 0, 1),
  Math.PI * (13 / 180)
);

export interface HeroGlobeHandle {
  setSpinSpeed: (speed: number) => void;
}

interface GlobeInnerProps {
  spinSpeedRef: React.MutableRefObject<number>;
}

function GlobeInner({ spinSpeedRef }: GlobeInnerProps) {
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

  // Current interpolated speed for smooth transitions
  const currentSpeed = useRef(1);

  useFrame((_, delta) => {
    // Smoothly interpolate to target speed
    currentSpeed.current = MathUtils.lerp(
      currentSpeed.current,
      spinSpeedRef.current,
      0.05
    );
    earthUniforms.current.uTime.value += delta * currentSpeed.current;
  });

  return (
    <group>
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
    const spinSpeedRef = useRef(1);

    useImperativeHandle(ref, () => ({
      setSpinSpeed: (speed: number) => {
        spinSpeedRef.current = speed;
      },
    }));

    return (
      <div className="w-full h-full">
        <Canvas
          camera={{ fov: 40, position: [0, 0, 5] }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <GlobeInner spinSpeedRef={spinSpeedRef} />
          </Suspense>
        </Canvas>
      </div>
    );
  }
);
