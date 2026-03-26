"use client";

import { type MutableRefObject, useRef } from "react";
import { SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { earthFragmentShader, earthVertexShader } from "./earth-shaders";
import { Atmosphere } from "./atmosphere";

interface EarthProps {
  lightDirectionRef: MutableRefObject<Vector3>;
}

export function Earth({ lightDirectionRef }: EarthProps) {
  const [earthDayTexture, nightTexture, cloudTexture] = useLoader(
    TextureLoader,
    [
      "/textures/earth-blue-marble-8k.jpg",
      "/textures/earth-night-8k.jpg",
      "/textures/clouds.png",
    ]
  );

  earthDayTexture.colorSpace =
    nightTexture.colorSpace =
    cloudTexture.colorSpace =
      SRGBColorSpace;

  const uniformsRef = useRef({
    dayMap: { value: earthDayTexture },
    nightMap: { value: nightTexture },
    cloudMap: { value: cloudTexture },
    uTime: { value: 0 },
    lightDirection: { value: lightDirectionRef.current.clone() },
  });

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta;
    uniformsRef.current.lightDirection.value.copy(lightDirectionRef.current);
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 256, 256]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniformsRef.current}
        />
      </mesh>
      <Atmosphere lightDirectionRef={lightDirectionRef} />
    </group>
  );
}
