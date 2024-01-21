import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { Samurai } from "./Samurai";
import Loader from "../Loader";
import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";
import { AxesHelper, MathUtils, Vector3 } from "three";
import { Floor } from "./Floor";

const SamuraiScene = () => {
  const { camera } = useThree();
  
  const handleScroll = (e: WheelEvent) =>{
    console.log("=> ", e, window)
    camera.position.y += e.deltaY/120

    const yPosition = camera.position.y
    
    camera.position.x = Math.sin(yPosition)*17
    camera.position.z = Math.cos(yPosition)*17
    // camera.rotation.x -= MathUtils.degToRad(e.deltaY/120)
    camera.lookAt(new Vector3(0,yPosition-8, 0))
    console.log("=> y position : ", camera.position.y)
  }

  useEffect(()=>{
    // const handleScroll = (window: Window, e: Event) => {
    //   console.log("=> ", e, window);
    // };

    window.addEventListener('wheel', handleScroll);
    return ()=>{
      window.removeEventListener('wheel', handleScroll);
    }
  },[])

  const {
    light1Intensity,
    light1Position,
    light2Intensity,
    light2Position,
    light3Intensity,
    light3Position,
  } = useControls({
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
    light2Position: {
      value: [4, -2.9, 5.7],
      step: 0.1,
      min: -40,
      max: 40,
    },
    light2Intensity: {
      value: 50,
      step: 0.1,
      min: 0,
      max: 500,
    },
    light3Position: {
      value: [6,9,-7],
      step: 0.1,
      min: -40,
      max: 40,
    },
    light3Intensity: {
      value: 50,
      step: 0.1,
      min: 0,
      max: 500,
    },
  });


  return (
    <>
      
        <Suspense fallback={<Loader />}>
        <OrbitControls />
          <ambientLight intensity={2} />
          <pointLight
            position={light1Position}
            intensity={light1Intensity}
            color={"#FFECA6"}
          />
          <pointLight
            position={light2Position}
            intensity={light2Intensity}
            color={"white"}
          />
          <pointLight
            position={light3Position}
            intensity={light3Intensity}
            color={"#A6EBFF"}
          />
        </Suspense>

        <Samurai scale={10} position={[0,2.5,0]}/>
        <Floor rotation={[0,MathUtils.degToRad(90),0]} scale={2}/>
    </>
  );
};

export default SamuraiScene;
