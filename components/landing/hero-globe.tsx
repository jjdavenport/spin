"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  BackSide,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import { earthFragmentShader, earthVertexShader } from "./earth/earth-shaders";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./earth/atmosphere-shaders";

const LIGHT_DIR = new Vector3(1, 0, 0).applyAxisAngle(
  new Vector3(0, 0, 1),
  Math.PI * (13 / 180)
);

function Globe() {
  const [dayTex, nightTex, cloudTex] = useLoader(TextureLoader, [
    "/textures/earth-blue-marble-8k.jpg",
    "/textures/earth-night-8k.jpg",
    "/textures/earth-clouds.jpg",
  ]);

  dayTex.colorSpace = nightTex.colorSpace = cloudTex.colorSpace = SRGBColorSpace;

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
    earthUniforms.current.uTime.value += delta;
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

export function HeroGlobe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ fov: 40, position: [0, 0, 5] }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}
