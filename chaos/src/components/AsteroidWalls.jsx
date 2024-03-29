import React from 'react'
import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei'

const AsteroidWalls = () => {
    const viewport = useThree((state) => state.viewport);

    return (
    <group>
            <RigidBody type='fixed' scale={[1, 1, viewport.height/3]} restitution={1.5}>
                <Box position={[-viewport.width*1.5, 2, 0]} args={[0.5, 5, 10]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[1, 1, viewport.height/3]} restitution={1.5}>
                <Box position={[viewport.width*1.5, 2, 0]} args={[0.5, 5, 10]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[viewport.width/3, 1, 1]} restitution={1.5}>
                <Box position={[0, 2, viewport.height*1.5]} args={[10, 5, 0.5]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[viewport.width/3, 1, 1]} restitution={1.5}>
                <Box position={[0, 2, -viewport.height*1.5]} args={[10, 5, 0.5]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>
        </group>
    )
}

export default AsteroidWalls