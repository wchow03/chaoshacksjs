
import { Sphere, OrbitControls, Tetrahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';

const Asteroid = (props) => {
  const asteroidRef = useRef();

  // if (asteroidRef && asteroidRef.current) {
  //   asteroidRef.current.restrictTranslations(true, false, true, true);
  //   const impulseX = props.impulseX;
  //   const impulseZ = props.impulseZ;
  //   asteroidRef.current.applyImpulse({x: impulseX, y: 0, z: impulseZ});
  // }
// useFrame((state, delta) => {
//     if (!asteroidRef || !asteroidRef.current) return;
//   }, []);
useEffect(() => {
  if (asteroidRef.current) {
    const impulseX = props.impulseX;
    const impulseZ = props.impulseZ;
    asteroidRef.current.addForce({x: impulseX, y: 0, z: impulseZ});
  }
}, [])


  return (
    <>
      <RigidBody {...props}
         ref={asteroidRef} 
         scale={0.5} 
        //  applyImpulse={{x: 0.5, y: 0.5, z:0.5}}
         >
        {/* TODO: randomize radius and maybe detail */}
        <Tetrahedron args={[1, 2]}>
            {/* TODO: set random color between 0.01-0.05 */}
          <meshStandardMaterial color={[0.01, 0.01, 0.01]}/>
        </Tetrahedron>
      </RigidBody>
    </>
  );
};

export default Asteroid