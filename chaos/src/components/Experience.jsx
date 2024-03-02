
import { Box, OrbitControls, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react';
import { Controls } from '../App';
import { RigidBody } from '@react-three/rapier';

const Experience = () => {
  const cubeRef = useRef();

  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);

  const objectSpeed = 0.3;

  useFrame((state, delta) => {
    state.camera.lookAt(0, 0, 0);
    // cubeRef.current.rotation.y += delta;
    if (forwardPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: -objectSpeed});
    } else if (backPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: objectSpeed});
    } else if (leftPressed) {
      cubeRef.current.applyImpulse({x: -objectSpeed, y: 0, z: 0});
    } else if (rightPressed) {
      cubeRef.current.applyImpulse({x: objectSpeed, y: 0, z: 0});
    }
  });


  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight intensity={3}/>
      <directionalLight position={[4, 5, 6]} intensity={4}/>

      {/* <mesh ref={cubeRef}>
          <boxGeometry/>
          <meshStandardMaterial color={"red"}/>
      </mesh> */}

      <RigidBody ref={cubeRef}>
        <Box position={[0, 2, 0]}>
          <meshStandardMaterial color={"red"}/>
        </Box>
      </RigidBody>

      <RigidBody type='fixed'>
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color={"green"}/>
        </Box>
      </RigidBody>

      {/* <mesh scale={10} position-y={-0.5} rotation-x={-Math.PI/2}>
        <planeGeometry />
        <meshStandardMaterial color={"green"}/>
      </mesh> */}
    </>
  )
}

export default Experience