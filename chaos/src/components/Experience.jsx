
import { Box, OrbitControls, useKeyboardControls } from '@react-three/drei'
import { useFrame} from '@react-three/fiber'
import { useRef } from 'react';
import { Controls } from '../App';
import { RigidBody } from '@react-three/rapier';
import Walls from './Walls.jsx'
import { Rings } from './Rings';

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
        <OrbitControls />
        <ambientLight intensity={3}/>
        <directionalLight position={[4, 5, 6]} intensity={4}/>

        <RigidBody ref={cubeRef}>
        <Box position={[0, 1, 0]}>
            <meshStandardMaterial color={"red"}/>
        </Box>
        </RigidBody>
        <Walls />
      <Rings/>
    </>
  )
}

export default Experience