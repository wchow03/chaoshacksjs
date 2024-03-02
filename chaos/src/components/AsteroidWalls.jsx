import React from 'react'

const AsteroidWalls = () => {
    const viewport = useThree((state) => state.viewport);

    return (
    <group>
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

export default AsteroidWalls