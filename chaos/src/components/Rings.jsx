import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three'

export const Rings = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta; // Rotate the ring around the x-axis
    ref.current.rotation.y += delta; // Rotate the ring around the y-axis
  });

  return (
    <RigidBody>
      <Ring
        ref={ref}
        args={[1, 1.5, 32]} // Inner radius, outer radius, number of segments
        position={[10,4,0]}
      >
        <meshStandardMaterial color="red" side={THREE.DoubleSide}/>
      </Ring>
    </RigidBody>
  );
};
