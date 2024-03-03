import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei'; // Import Torus instead of Ring
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export const Rings = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta; // Rotate the torus around the x-axis
    ref.current.rotation.y += delta; // Rotate the torus around the y-axis
  });

  return (
    <RigidBody name={"Torus"} type={"static"} onCollisionEnter={({manifold, target, other}) => {
      other.linvel *= 2;
    }}>
      <Torus
        ref={ref}
        args={[0.5, 0.1, 16, 100]} // Radius, tube radius, radial segments, tubular segments
        position={[10, 2, 0]}
      >
        <meshStandardMaterial color="yellow" side={THREE.DoubleSide} />
      </Torus>
    </RigidBody>
  );
};