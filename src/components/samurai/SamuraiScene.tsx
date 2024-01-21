import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Samurai } from "./Samurai";
import Loader from "../Loader";
import { useControls } from "leva";
import {
  OrbitControls,
} from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { Floor } from "./Floor";
import { StreetSign } from "./StreetSign";
import { Swarm } from "./Swarm";
import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

const SamuraiScene = () => {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  
  let targetPlace = 4
  const deltaMove=0.01
  let actualPlace = 0
  const scrollStep = 0.2

  useFrame(({clock})=>{
    // console.log("=> clock : ", clock)
    // target
    if((Math.abs(camera.position.y-targetPlace)>0.02) ){
      console.log("=> MMMOOOOVEEE")
      
      actualPlace += (camera.position.y<targetPlace) ? deltaMove : -deltaMove
      camera.position.y = actualPlace;

      camera.position.x = Math.sin(actualPlace) * 17;
      camera.position.z = Math.cos(actualPlace) * 17;
      // camera.rotation.x -= MathUtils.degToRad(e.deltaY/120)
      camera.lookAt(new Vector3(0, -0.05*actualPlace+10, 0));
      console.log("=> y position : ", camera.position.y);
    }

    // actual

  })


  const handleScroll = (e: WheelEvent) => {
    targetPlace += e.deltaY > 0 ? scrollStep : -scrollStep;
    if(targetPlace>20){
      targetPlace=10
    }else if(targetPlace<0){
      targetPlace=0
    }
    console.log("=> TARGET PLACE : ", targetPlace)
  };

  useEffect(() => {
    // const handleScroll = (window: Window, e: Event) => {
    //   console.log("=> ", e, window);
    // };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

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
      value: [6, 9, -7],
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
      <fog attach="fog" args={['black', 15, 35]} />
      <Suspense fallback={<Loader />}>
        {/* <OrbitControls /> */}
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

      <Samurai scale={10} position={[0, 2.5, 0]} />
      <StreetSign
        scale={10}
        position={[-10, -2, 0]}
        rotation={[0, 0, MathUtils.degToRad(20)]}
      />
      <EffectComposer>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={0.6}
        />
        <Bloom
          kernelSize={KernelSize.HUGE}
          luminanceThreshold={0}
          luminanceSmoothing={0}
          intensity={0.1}
        />
      </EffectComposer>

      <Swarm count={isMobile ? 1000 : 2000} mouse={mouse} />
      {/* <CameraShake yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} /> */}
      <Floor rotation={[0, MathUtils.degToRad(90), 0]} scale={2} />
      

      {/* <ContactShadows scale={10} blur={3} opacity={0.25} far={10} /> */}
    </>
  );
};

export default SamuraiScene;
