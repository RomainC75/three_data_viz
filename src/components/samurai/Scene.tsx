import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";

const SamuraiScene = () => {
    const [isRotating, setIsRotating] = useState<boolean>(false)
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [3, 3, 7],
        }}
        className={`w-full h-screen bg-black ${
            isRotating ? "cursor-grabbing" : "cursor-grab"
          }`}
      ></Canvas>
    </>
  );
};

export default SamuraiScene;
