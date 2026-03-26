"use client";

import { forwardRef } from "react";
import type { JSX } from "react";
import type { Mesh } from "three";

export const Sun = forwardRef<Mesh, JSX.IntrinsicElements["mesh"]>(
  function Sun(props, ref) {
    return (
      <mesh ref={ref} {...props}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="orange"
          emissiveIntensity={10}
          toneMapped={false}
        />
      </mesh>
    );
  }
);
