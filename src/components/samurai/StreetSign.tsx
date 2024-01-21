
import { useGLTF } from "@react-three/drei";
import streetSign from "../../assets/3D/japanese_neon_street_sign.glb"

export function StreetSign(props) {
  const { nodes, materials } = useGLTF(streetSign);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.typeBlinnSG}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.14}
      />
    </group>
  );
}

useGLTF.preload("/japanese_neon_street_sign.glb");