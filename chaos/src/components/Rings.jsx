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
  // let position = {x: 10, y: 2, z: 0};
  let position = [10, 2, 0];

  return (
    <RigidBody name={"Torus"} type={"fixed"} sensor onIntersectionEnter={({manifold, target, other}) => {
      other.rigidBody.applyImpulse({x: other.rigidBody.linvel().x*0.5, y: 0, z: other.rigidBody.linvel().z*0.5});
      position = [-position.x, position.y, position.z];
    }}>
      <Torus
        ref={ref}
        args={[0.5, 0.1, 16, 100]} // Radius, tube radius, radial segments, tubular segments
        position={position}
      >
        <meshStandardMaterial color="yellow" side={THREE.DoubleSide} />
      </Torus>
    </RigidBody>
  );
};