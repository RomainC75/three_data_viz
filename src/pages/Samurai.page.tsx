import { Canvas } from "@react-three/fiber"
import SamuraiScene from "../components/samurai/SamuraiScene"
import { useCallback, useState } from "react";
import { Fog } from 'three';
import Panels from "../components/samurai/Panels";

const SamuraiPage = () => {
  const [isRotating, setIsRotating] = useState<boolean>(false);
    const [panel, setPanel] = useState<number>(0)
    const memoizedSetPanel = useCallback((step: number) => {
        setPanel(step);
      }, []);
  return (
    <div className="w-full h-screen bg-transparent">
        <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [13, 0, 17],
        }}
        // bg-transparent
        className={`w-full h-screen bg-black ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        
        <SamuraiScene setPanel={memoizedSetPanel}/>
      </Canvas>
    </div>
  )
}

export default SamuraiPage