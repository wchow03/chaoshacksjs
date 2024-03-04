
import { Cone, Box, OrbitControls, useKeyboardControls, TorusKnot, Stars } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import { Controls } from '../App';
import { RigidBody } from '@react-three/rapier';
import Asteroid from './Asteroid.jsx';
import Walls from './Walls.jsx'
import { Rings } from './Rings';
import AsteroidWalls from './AsteroidWalls.jsx';

const Experience = ({isGameOver, setGameOver}) => {
  const viewport = useThree((state) => state.viewport);
  const cubeRef = useRef();

  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);

  const [asteroids, setAsteroids] = useState([])
  // let asteroids = [];

  const addAsteroid = ()=> {
    const asteroidCount = asteroids.length;
    if (asteroidCount >= 50) return;
    let side = Math.floor(Math.random() * 4);
    let pos = [0,0,0];
    let impulseX = (Math.random()-0.5)*2;
    let impulseZ = (Math.random()-0.5)*2;
    if (side == 0) { // left
      pos = [-viewport.width-2-Math.random()*viewport.width/2, 2, (Math.random()-0.5) * viewport.height];
      impulseX = 0.5+Math.random()*10;
    } else if (side == 1) { // right
      pos = [viewport.width+2+Math.random()*viewport.width/2, 2, (Math.random()-0.5) * viewport.height];
      impulseX = -0.5-Math.random()*10;
    } else if (side == 2) { // up
      pos = [(Math.random()-0.5) * viewport.width, 2, -viewport.height-2-Math.random()*viewport.height/2];
      impulseZ = 0.5+Math.random()*10;
    } else if (side == 3) { // down
      pos = [(Math.random()-0.5) * viewport.width, 2, viewport.height+2+Math.random()*viewport.height/2];
      impulseZ = -0.5-Math.random()*10;
    }
    // asteroids.push({impulseX: impulseX, impulseZ: impulseZ, pos: pos, asteroidCount: asteroidCount});

    // Push a new Asteroid element onto the asteroids state 
    setAsteroids([...asteroids,
                  <Asteroid
                    key={asteroidCount}
                    impulseX={impulseX}
                    impulseZ={impulseZ}
                    position={pos}
                    col={0.05+Math.random()*0.06}
                  />]);
    }

    

  const objectSpeed = 0.3;

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.restrictTranslations(true, false, true, true);
    }
  }, []);

  useFrame((state, delta) => {
    state.camera.lookAt(0, 0, 0);
    if (forwardPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: -delta*10});
      addAsteroid();
    } else if (backPressed) {
      cubeRef.current.applyImpulse({x:0, y: 0, z: delta*10});
      addAsteroid();
    } else if (leftPressed) {
      cubeRef.current.applyImpulse({x: -delta*10, y: 0, z: 0});
      addAsteroid();
    } else if (rightPressed) {
      cubeRef.current.applyImpulse({x: delta*10, y: 0, z: 0});
      addAsteroid();
    }
    if (cubeRef.current.translation().x <= -viewport.width/2) {
      setGameOver(true);
      window.location.reload();
    } else if (cubeRef.current.translation().x >= viewport.width/2) {
      setGameOver(true);
      window.location.reload();
    } else if (cubeRef.current.translation().z <= -viewport.height/2) {
      setGameOver(true);
      window.location.reload();
    } else if (cubeRef.current.translation().z >= viewport.height/2) {
      setGameOver(true);
      window.location.reload();
    }
  });

  return (
    <>
      <OrbitControls/>
      <ambientLight intensity={4.5}/>
      <directionalLight position={[4, 5, 6]} intensity={4}/>
        <RigidBody ref={cubeRef} colliders={"hull"} scale={0.7} colliders="hull" onCollisionEnter={({ manifold, target, other }) => {
          if (other.rigidBodyObject.name != "Torus") {
          setGameOver(true);
          window.location.reload();
          }
        }}>
            {/* <Cone position={[0, 1, 0]} args={[0.5, 1, 8]} rotation-x={-Math.PI/2}>
                <meshStandardMaterial color={"red"} wireframe />
            </Cone> */}
            <TorusKnot position={[0, 3, 0]} args={[0.5, 0.2]} rotation-x={-Math.PI/2} >
                <meshStandardMaterial color={"red"} />
            </TorusKnot>
        </RigidBody>
        <Walls />
        <AsteroidWalls />
      <Rings/>
      <Stars count={50000}/>

      {/* {asteroids.map((a) =>
      (<Asteroid
        key={a.asteroidCount}
        impulseX={a.impulseX}
        impulseZ={a.impulseZ}
        position={a.pos}
        col={Math.random()*0.06}
      />))} */}
      {[...asteroids]}
    </>
  )
}

export default Experience