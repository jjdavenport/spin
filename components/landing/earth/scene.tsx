"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { Mesh } from "three";
import { Earth } from "./earth";
import { Sun } from "./sun";

const initialLightDirection = new Vector3(1, 0, 0).applyAxisAngle(
  new Vector3(0, 0, 1),
  Math.PI * (13 / 180)
);

export function PrimaryScene() {
  const lightRef = useRef(initialLightDirection.clone());
  const rotationRef = useRef(0);
  const sunRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    rotationRef.current += delta * 3;
    const angle = Math.PI * (-rotationRef.current / 180);
    lightRef.current
      .copy(initialLightDirection)
      .applyAxisAngle(new Vector3(0, 1, 0), angle);

    if (sunRef.current) {
      sunRef.current.position
        .copy(lightRef.current)
        .multiplyScalar(15);
    }
  });

  return (
    <>
      <Earth lightDirectionRef={lightRef} />
      <Sun ref={sunRef} position={initialLightDirection.clone().multiplyScalar(15)} />
      <ambientLight intensity={0.1} />
      <color attach="background" args={["#000000"]} />
    </>
  );
}
