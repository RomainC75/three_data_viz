import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Grid from "./Grid";
import { ICryptoData } from "../@types/crypto.types";
import { use2DRefs } from "./hooks/create2DRef";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

interface SceneContentProps {
  data: ICryptoData;
}

const MAX = [10, 10, 10];

const SceneContent = ({ data }: SceneContentProps) => {
  let refs = use2DRefs<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(data.data)


  useFrame(() => {
    // console.log("=< data : ", refs[0].current.position.x, data);
    // data.forEach((point, i) => {
    //   refs[i].current.position.x = Math.random() < 0.5 ? data[i].coord[0] : i;
    // });
    const currencies = Object.keys(data.data)
    currencies.forEach(() => {
        
    });
  });
  return (
    <>
      <Grid maxX={MAX[0]} maxY={MAX[1]} maxZ={MAX[2]} />

      {Object.keys(data.data).map((currency, z) => {
        return data.data[currency].map((value, index) => (
          <mesh key={`${z}-${currency}-${index}`} position={[index, 0, z]} ref={refs[z][index]}>
            <sphereGeometry args={[1, 64, 32, 100]} />
            <meshStandardMaterial color={"red"} wireframe />
          </mesh>
        ));
      })}

      {/* {data.map((p, i) => (
        <mesh key={i} position={[0, 0, 0]} ref={refs[i]}>
          <sphereGeometry args={[p.size, 64, 32, 100]} />
          <meshStandardMaterial color={p.color} wireframe />
        </mesh>
      ))} */}
    </>
  );
};

export default SceneContent;
