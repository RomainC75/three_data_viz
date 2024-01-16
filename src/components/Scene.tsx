import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { pointsData } from "../utils/data";
import Grid from "./Grid";



const Scene = () => {
    

  return (
    <div style={{ width: "1500px", height: "1000px", border:"1px solid white" }}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [20, 20, 20],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={2} />

        <Grid maxX={10} maxY={10} maxZ={10}/>

        {pointsData.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.5, 64, 32, 100]} />
            <meshStandardMaterial color="#CC3941" wireframe />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default Scene;
