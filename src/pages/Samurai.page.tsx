import { Canvas } from "@react-three/fiber"
import SamuraiScene from "../components/samurai/SamuraiScene"
import { useState } from "react";

const SamuraiPage = () => {
  const [isRotating, setIsRotating] = useState<boolean>(false);

  return (
    <div className="w-full h-screen bg-transparent">
        <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [13, 5, 17],
        }}
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <SamuraiScene/>
      </Canvas>
    </div>
  )
}

export default SamuraiPage