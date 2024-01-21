
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import floor from "../../assets/3D/stone_floor_texture.glb"

export function Floor(props) {
  const { nodes, materials } = useGLTF(floor);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        position={[0.001, 0, 1.667]}
        rotation={[-Math.PI / 2, 0, -3.14]}
        scale={1.697}
      />
    </group>
  );
}

useGLTF.preload("/stone_floor_texture.glb");