import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { PlaneCmp, PlaneCmpProps } from "./Plane";
import { Ref, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useArrayOfRefs } from "../hooks/create2DRef";

const PLANE_NUMBER = 10;

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

function easeInOutQuint(x: number): number {
    if(x===0){
        return 0
    }
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const getMovement = (position: number, target: number, speed: number): number =>{
    const fraction = (Math.log10(Math.abs(position-target))+1.5)/1.8

    // const fraction = easeInOutQuint(Math.abs(position-target))
    if(position< (target)){
        return speed*fraction
    }else if(position > (target)){
        return -speed*fraction
    }else {
        return 0
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

  let scrollCounter = 0
  const speed = 0.05;

  useFrame(({ clock })=>{
        totemRef.current.position.y += getMovement(totemRef.current.position.y, scrollCounter, speed);
        totemRef.current.rotation.y += getMovement(totemRef.current.rotation.y, scrollCounter, speed);

        planeRefs.forEach(planeRef=>{
            console.log("=>planeRef", planeRef.current)
            if(planeRef.current){
                planeRef.current.position.x += getMovement(planeRef.current.position.x, scrollCounter, speed)
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
