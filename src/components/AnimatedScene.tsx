import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Grid from "./Grid";
import { IPoint } from "../@types/coords";
import SceneContent from "./SceneContent";
import { IValue } from "../utils/crypto";
import { ICryptoData } from "../@types/crypto.types";

interface AnimatedSceneProps{
  data: ICryptoData
}
const MAX=[10,10,10]

const AnimatedScene = ({data}: AnimatedSceneProps) => {
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
      >

        {/* 1 / make a component ! */}
        {/* 2 / useRef */}

        <OrbitControls />
        <ambientLight intensity={2} />

        <SceneContent data={data}/>

      </Canvas>
    </div>
  );
};

export default AnimatedScene;
