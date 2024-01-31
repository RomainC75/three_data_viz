import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { PlaneCmp, PlaneCmpProps } from "./Plane";
import { Ref, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useArrayOfRefs } from "../hooks/create2DRef";

const PLANE_NUMBER = 10;
const MAX_HEIGHT = 10;
const IMAGE_DISTANCE_TO_CENTER = 5;

const getImagesPositions = (
  imageNumber: number,
  height: number
): PlaneCmpProps[] => {
  return Array(imageNumber)
    .fill(true)
    .map((_, index) => ({
      position: [
        Math.sin((index * 2 * Math.PI) / (imageNumber - 1)) * 5,
        (index * height) / (imageNumber - 1),
        Math.cos((index * 2 * Math.PI) / (imageNumber - 1)) * 5,
      ],
      rotation: [0, (index * 2 * Math.PI) / (imageNumber - 1), 0],
    }));
};

const getTotemMovement = (position: number, target: number, speed: number): number =>{
    const fraction = (Math.log10(Math.abs(position-target))+1.5)/1.8
    // const fraction = easeInOutQuint(Math.abs(position-target))
    if(position< (target) ){
        return speed*fraction 
    }else if(position > (target) ){
        return -speed*fraction
    }else {
        return 0
    }
}

const getPlanesMovement = (actualPosition: number, target: number, index: number, totalImageNumber: number, height: number, speed: number) => {
    const fraction = (Math.log10(Math.abs(actualPosition-target))+1.5)/1.8
    const angle = (actualPosition + speed*fraction) * 2 * Math.PI  / height    
    return {
        position: [
          Math.sin((index * 2 * Math.PI) / (totalImageNumber - 1) + angle) * IMAGE_DISTANCE_TO_CENTER,
          (index * height ) / (totalImageNumber - 1) - (-actualPosition + speed*fraction),
          Math.cos((index * 2 * Math.PI) / (totalImageNumber - 1) + angle) * IMAGE_DISTANCE_TO_CENTER,
        ],
        rotation: [0, ((index * 2 * Math.PI) / (totalImageNumber - 1)+angle), 0],
      }
}

const MonolithScene = () => {
    const planeRefs= useArrayOfRefs<Ref>(PLANE_NUMBER)
    console.log("=> PLANE REFDS : ", planeRefs)
    const totemRef = useRef()
    
    const handleScroll = (event) => {
      if(Math.abs(scrollCounter-totemRef.current.position.y) < 1){
          scrollCounter += event.deltaY > 0 ? 1: -1;
      }
    };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  let scrollCounter = 0;
  const speed = 0.05;

  useFrame(({ clock })=>{
        const actualPosition = totemRef.current.position.y
        totemRef.current.position.y += getTotemMovement(actualPosition, scrollCounter, speed);
        totemRef.current.rotation.y += getTotemMovement(actualPosition, scrollCounter, speed);
        planeRefs.forEach( (planeRef, index) => {
            if(planeRef.current){
                const mvt = getPlanesMovement(-actualPosition, scrollCounter, index, PLANE_NUMBER, MAX_HEIGHT, speed)
                planeRef.current.position.x = mvt.position[0]
                planeRef.current.position.y = mvt.position[1]
                planeRef.current.position.z = mvt.position[2]
                planeRef.current.rotation.x = mvt.rotation[0]
                planeRef.current.rotation.y = mvt.rotation[1]
                planeRef.current.rotation.z = mvt.rotation[2]
            }
        })

    
  })

  const { light1Intensity, light1Position } = useControls({
    light1Position: {
      value: [-2, 18, -5],
      step: 0.1,
      min: -40,
      max: 40,
    },
    light1Intensity: {
      value: 900,
      step: 0.1,
      min: 0,
      max: 1000,
    },
  });

  return (
    <>
      {/* <OrbitControls /> */}

      <pointLight
        position={light1Position}
        intensity={light1Intensity}
        color={"white"}
      />

      {/* <Html center position={[-1, 1, -1]}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          explicabo quasi saepe quidem? Adipisci repellat ipsa provident
          delectus quas ea mollitia quos totam quasi tempore nemo non doloremque
          recusandae fuga neque minus, error deserunt earum sint rem. Veniam
          praesentium ea officiis veritatis sed consectetur nobis fugiat dicta
          tempora! Deserunt, veritatis?
        </p>
      </Html> */}

      <ambientLight intensity={10} />
      <mesh position={[0, 5, 0]} ref={totemRef}>
        <boxGeometry attach="geometry" args={[1, 10, 1]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>

      {getImagesPositions(PLANE_NUMBER, 10).map((p, index) => (
        <PlaneCmp key={index + "plane"} ref={planeRefs[index]} {...p} />
      ))}
    </>
  );
};

export default MonolithScene;
