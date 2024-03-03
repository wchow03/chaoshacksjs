import React from 'react'
import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei'

const Walls = () => {
    const viewport = useThree((state) => state.viewport);

    return (
    <group>
            {/* <RigidBody type='fixed' scale={[viewport.width, 1, viewport.height]}>
                <Box position={[0, 0.5, 0]} args={[10, 1, 10]}>
                <meshStandardMaterial color={"green"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[viewport.width, 1, viewport.height]}>
                <Box position={[0, 3.5, 0]} args={[10, 1, 10]}>
                <meshStandardMaterial transparent opacity={0}/>
                </Box>
            </RigidBody> */}

            <RigidBody type='fixed' scale={[1, 1, viewport.height/5]} colliders={false}>
                <Box position={[-viewport.width-0.25, 2, 0]} args={[0.5, 5, 10]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[1, 1, viewport.height/5]} colliders={false}>
                <Box position={[viewport.width-0.25, 2, 0]} args={[0.5, 5, 10]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[viewport.width/5, 1, 1]} colliders={false}>
                <Box position={[0, 2, viewport.height]} args={[10, 5, 0.5]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>

            <RigidBody type='fixed' scale={[viewport.width/5, 1, 1]} colliders={false}>
                <Box position={[0, 2, -viewport.height]} args={[10, 5, 0.5]}>
                <meshStandardMaterial color={"blue"}/>
                </Box>
            </RigidBody>
        </group>
    )
}

export default Walls