import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Grid from "./Grid";
import { IPoint } from "../@types/coords";

interface sceneProps{
  data: IPoint[]
}

const Scene = ({data}: sceneProps) => {

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
        <OrbitControls />
        <ambientLight intensity={2} />

        <Grid maxX={10} maxY={10} maxZ={10} />

        {data.map((p, i) => (
          <mesh key={i} position={[p.coord[0], p.coord[1], p.coord[2]]}>
            <sphereGeometry args={[p.size, 64, 32, 100]} />
            <meshStandardMaterial color="#CC3941" wireframe />
          </mesh>
        ))}

      </Canvas>
    </div>
  );
};

export default Scene;
