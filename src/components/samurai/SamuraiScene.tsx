import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Samurai } from "./Samurai";
import Loader from "../Loader";
import { useControls } from "leva";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { Floor } from "./Floor";
import { StreetSign } from "./StreetSign";
import { Swarm } from "./Swarm";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import Panels from "./Panels";

interface SamuraiProp {
  setPanel: (step: number) => void;
}

const SamuraiScene = ({ setPanel }) => {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);
  const refLightRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const MAX_Y = 21;
  let targetPlace = 21;
  const deltaMove = 0.02;
  let actualPlace = 0;
  const scrollStep = 0.2;

  useFrame(({ clock }) => {
    if (Math.abs(camera.position.y - targetPlace) > 0.02) {
      actualPlace += camera.position.y < targetPlace ? deltaMove : -deltaMove;
      camera.position.y = actualPlace;
      camera.position.x = Math.sin((actualPlace * 2 * Math.PI) / 19) * 15;
      camera.position.z = Math.cos((actualPlace * 2 * Math.PI) / 19) * 15;
      refLightRef.current.intensity = 30 * (actualPlace - 10);
      if (actualPlace < 20) {
        camera.lookAt(new Vector3(0, -0.03 * actualPlace + 15, 0));
      } else {
        camera.lookAt(
          new Vector3(-2 * (actualPlace - 20), -0.03 * actualPlace + 15, 0)
        );
        camera.rotation.z = MathUtils.degToRad(12 * (actualPlace - 20));
      }
    }
    if (actualPlace > 5 && actualPlace < 8) {
    } else {
    }
  });

  const handleScroll = (e: WheelEvent) => {
    targetPlace += e.deltaY > 0 ? 2 * scrollStep : -2 * scrollStep;
    if (targetPlace > MAX_Y) {
      targetPlace = MAX_Y;
    } else if (targetPlace < 0) {
      targetPlace = 0;
    }
  };

  useEffect(() => {
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
      <fog attach="fog" args={["black", 15, 35]} />
      <Suspense fallback={<Loader />}>
        <OrbitControls />
        <ambientLight intensity={2} />
        <pointLight
          position={light1Position}
          intensity={light1Intensity}
          color={"#FFECA6"}
        />
        <pointLight
          position={[-10, 0, 10]}
          // intensity={}
          color={"red"}
          ref={refLightRef}
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
        {/* <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={0.1}
        /> */}
        <Bloom
          kernelSize={KernelSize.HUGE}
          luminanceThreshold={0}
          luminanceSmoothing={0}
          intensity={0.1}
        />
        {/* <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} /> */}
      </EffectComposer>

      <Float floatIntensity={10} rotationIntensity={4}>
        <Html style={{ userSelect: 'none' }} castShadow receiveShadow occlude="blending" transform>
          <iframe title="embed" width={700} height={500} src="https://threejs.org/" frameBorder={0} />
        </Html>
      </Float>

      <Swarm count={isMobile ? 1000 : 2000} mouse={mouse} />
      {/* <CameraShake yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} /> */}
      <Floor rotation={[0, MathUtils.degToRad(90), 0]} scale={2} />

      {/* <ContactShadows scale={10} blur={3} opacity={0.25} far={10} /> */}
    </>
  );
};

export default SamuraiScene;
