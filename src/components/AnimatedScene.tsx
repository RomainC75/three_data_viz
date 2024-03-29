import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
import { ICryptoData } from "../@types/crypto.types";
import { useEffect } from "react";
import * as THREE from 'three';
import { Effects } from "./samurai/Effect";

interface AnimatedSceneProps{
  data: ICryptoData
}
const MAX=[10,10,10]



const AnimatedScene = ({data}: AnimatedSceneProps) => {
    useEffect(()=>{
        console.log("=> ANIMATED SCENE RENDER")
    },[data]);

  return (
    <div
      style={{ width: "1500px", height: "1000px", border: "1px solid white" }}
    >
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [20, 20, 20],
        }}
        onCreated={({ gl }) => {
            gl.toneMapping = THREE.ReinhardToneMapping
            gl.setClearColor(new THREE.Color('#020207'))
          }}
      >

        {/* 1 / make a component ! */}
        {/* 2 / useRef */}

        <OrbitControls />
        <ambientLight intensity={2} />
        <SceneContent data={data}/>

        <Effects/>
      </Canvas>
    </div>
  );
};

export default AnimatedScene;
