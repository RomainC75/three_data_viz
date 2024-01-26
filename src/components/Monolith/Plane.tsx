import { DoubleSide } from "three";

export interface PlaneCmpProps{
    position: [number, number, number];
    rotation: [number, number, number];
}

export const PlaneCmp = (props: PlaneCmpProps) => {
  return (
    <mesh {...props} scale={[2, 2, 2]}>
      <planeGeometry />
      <meshLambertMaterial 
        color="green" 
        // side={DoubleSide} 
      />
    </mesh>
  );
}
