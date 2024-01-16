import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useState } from "react";
import { pointsData } from "../utils/data";
import Grid from "./Grid";
import { Slider } from "@mui/material";

const Scene = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);

  const handleSliderChange = (_, newValue: number | number[]) => {
    setSliderValue(newValue as number)

  };

  return (
    <div
      style={{ width: "1500px", height: "1000px", border: "1px solid white" }}
    >
      <Slider aria-label="Volume" value={sliderValue} onChange={handleSliderChange} />
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

        <Grid maxX={10} maxY={10} maxZ={10} />

        {pointsData.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.5, 64, 32, 100]} />
            <meshStandardMaterial color="#CC3941" wireframe />
          </mesh>
        ))}

        <mesh position={[sliderValue, 0, 0]}>
          <sphereGeometry args={[0.5, 64, 32, 100]} />
          <meshStandardMaterial color="white" wireframe />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Scene;
