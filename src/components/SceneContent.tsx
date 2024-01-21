import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Grid from "./Grid";
import { ICryptoData } from "../@types/crypto.types";
import { use2DRefs } from "./hooks/create2DRef";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";


interface SceneContentProps {
  data: ICryptoData;
  currencies?: string[];
}

const COLORS = ["red", "blue", "green"]

const MAX = [60, 60, 60];

const SceneContent = ({ data }: SceneContentProps) => {
  const refs = use2DRefs<
    Mesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      Object3DEventMap
    >
  >(data);
  console.log("=)> refs : ", refs);

  useFrame(() => {
    // console.log("=< data : ", refs[0].current.position.x, data);
    // data.forEach((point, i) => {
    //   refs[i].current.position.x = Math.random() < 0.5 ? data[i].coord[0] : i;
    // });
    // const currencies = Object.keys(data.data);
    console.log("=> DATA : ", data);
    data.currencyPairs.forEach((currency, currencyIndex) => {
        refs[currencyIndex].forEach((ref, index)=>{
            console.log("=> ", data.data[currency][index].value/100)
            ref.current.position.y=data.data[currency][index].value/100
        })
    });
  });

  return (
    <>
      <Grid maxX={MAX[0]} maxY={MAX[1]} maxZ={MAX[2]} />

      {data.currencyPairs.map((currency, z) => {
        return refs[z].map((_, index) => {
          return (
            <mesh
              key={`${z}-${currency}-${index}`}
              position={[index, 0, z]}
              ref={refs[z][index]}
            >
              <sphereGeometry args={[0.1, 64, 32, 100]} />
              <meshStandardMaterial color={COLORS[z]} wireframe />
            </mesh>
          );
        });
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
