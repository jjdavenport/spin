"use client";

import { type MutableRefObject, useRef } from "react";
import { BackSide, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./atmosphere-shaders";

const vertices = Math.pow(2, 8);

interface AtmosphereProps {
  lightDirectionRef: MutableRefObject<Vector3>;
}

export function Atmosphere({ lightDirectionRef }: AtmosphereProps) {
  const uniformsRef = useRef({
    lightDirection: { value: lightDirectionRef.current.clone() },
  });

  useFrame(() => {
    uniformsRef.current.lightDirection.value.copy(lightDirectionRef.current);
  });

  return (
    <mesh scale={1.02}>
      <sphereGeometry args={[1, vertices, vertices]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniformsRef.current}
        side={BackSide}
        transparent
      />
    </mesh>
  );
}
