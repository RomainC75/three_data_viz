import { extend, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { DotScreen, EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from 'postprocessing';
import { BlendFunction } from "postprocessing";
import * as THREE from 'three';



export function Effects() {
    return (
      <EffectComposer>
        <DotScreen
        blendFunction={BlendFunction.NORMAL}
        angle={Math.PI * 0.5}
        scale={0.5}
      />
      </EffectComposer>
    );
  }