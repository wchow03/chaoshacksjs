
import { Cone, Box, OrbitControls, useKeyboardControls, TorusKnot } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react';
import { Controls } from '../App';
import { RigidBody } from '@react-three/rapier';
import Asteroid from './Asteroid.jsx';
import Walls from './Walls.jsx'
import { Rings } from './Rings';

const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const cubeRef = useRef();

  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);

  const [asteroids, setAsteroids] = useState([])

  const addAsteroid = ()=> {
    const asteroidCount = asteroids.length;
    // Push a new Asteroid element onto the asteroids state 
    let pos = [(Math.random()-0.5) * viewport.width, 2, (Math.random()-0.5) * viewport.height];
    setAsteroids([...asteroids,
                  <Asteroid
                    key={asteroidCount}
                    impulseX={(Math.random()-0.5)*2}
                    impulseZ={(Math.random()-0.5)*2}
                    position={pos}
                  />]);
  }

  const objectSpeed = 0.3;

  if (cubeRef && cubeRef.current) cubeRef.current.restrictTranslations(true, false, true, true);
  useFrame((state, delta) => {
    state.camera.lookAt(0, 0, 0);
    if (forwardPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: -objectSpeed});
    } else if (backPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: objectSpeed});
      addAsteroid();
    } else if (leftPressed) {
      cubeRef.current.applyImpulse({x: -objectSpeed, y: 0, z: 0});
        // cubeRef.current.rotation.z -= objectSpeed;
        // cubeRef.current.applyTorqueImpulse({x: 0, y: 0.01, z: 0});
    } else if (rightPressed) {
      cubeRef.current.applyImpulse({x: objectSpeed, y: 0, z: 0});
        // cubeRef.current.applyTorqueImpulse({x: 0, y: -0.01, z: 0});
    }
  });

  return (
    <>
      <OrbitControls/>
      <ambientLight intensity={3}/>
      <directionalLight position={[4, 5, 6]} intensity={4}/>
        <RigidBody ref={cubeRef} colliders={"cuboid"} scale={0.7}>
            {/* <Cone position={[0, 1, 0]} args={[0.5, 1, 8]} rotation-x={-Math.PI/2}>
                <meshStandardMaterial color={"red"} wireframe />
            </Cone> */}
            <TorusKnot position={[0, 1, 0]} args={[0.5, 0.2]} rotation-x={-Math.PI/2} >
                <meshStandardMaterial color={"red"} />
            </TorusKnot>
        </RigidBody>
        <Walls />
      <Rings/>

      {[...asteroids]}
    </>
  )
}

export default Experience