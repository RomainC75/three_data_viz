import { useRef } from "react";
import { IPoint } from "../@types/coords";
import { useFrame } from "@react-three/fiber";
import Grid from "./Grid";

interface SceneContentProps{
    data: IPoint[];
}

const MAX=[10,10,10]

const SceneContent = ({data}: SceneContentProps) => {

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const refs = [ref1, ref2, ref3]

    useFrame(()=>{
        console.log("=< data : ", refs[0].current.position.x, data)
        data.forEach((point, i)=>{
            refs[i].current.position.x = Math.random()<0.5 ?  data[i].coord[0] : i
        })
    })
  return (
    <>
      <Grid maxX={MAX[0]} maxY={MAX[1]} maxZ={MAX[2]} />

      {data.map((p, i) => (
        <mesh key={i} position={[0,0,0]} ref={refs[i]}>
          <sphereGeometry args={[p.size, 64, 32, 100]} />
          <meshStandardMaterial color={p.color} wireframe />
        </mesh>
      ))}
    </>
  );
};

export default SceneContent;


