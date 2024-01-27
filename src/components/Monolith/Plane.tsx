import { Ref, forwardRef } from "react";
import { DoubleSide } from "three";

export interface PlaneCmpProps{
    position: [number, number, number];
    rotation: [number, number, number];
}

export const PlaneCmp = forwardRef((props: PlaneCmpProps, ref) => {
  return (
    <mesh {...props} ref={ref} scale={[2, 2, 2]}>
      <planeGeometry />
      <meshLambertMaterial
        color="green" 
        side={DoubleSide} 
      />
    </mesh>
  );
})
