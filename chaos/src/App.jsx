import './App.css'
import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import Menu from './components/Menu.jsx'
import { KeyboardControls } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { Physics } from '@react-three/rapier';
 
export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right"
}

function App() {
  // Menu overlay hook
  const [isOpen, setIsOpen] = useState(true);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const map = useMemo(() => [
    {name: Controls.forward, keys:["ArrowUp", "KeyW"]},
    {name: Controls.back, keys:["ArrowDown", "KeyS"]},
    {name: Controls.left, keys:["ArrowLeft", "KeyA"]},
    {name: Controls.right, keys:["ArrowRight", "KeyD"]}
  ], []);

  return (
    <KeyboardControls map={map}>
      <Canvas camera={{zoom: 50 ,position: [0,10,0]}} style={{background: 'black'}} orthographic>
        <Suspense>
          <Physics gravity={[0, 0, 0]}>
            <Experience isGameOver={isOpen} setGameOver={setIsOpen}/>
          </Physics>
        </Suspense>
      </Canvas>
      <Menu isOpen={isOpen} toggleOverlayFunction={toggleOverlay} />
    </KeyboardControls>
  )
}

export default App
