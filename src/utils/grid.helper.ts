import * as THREE from 'three';
import { TCoord } from '../@types/coords';

export const getLinePoints = (x: number,y: number,z: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> =>{
    const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
    ];
    return new THREE.BufferGeometry().setFromPoints(points)
}

export const getXYZGridLines = (maxes: [number,number,number]): THREE.BufferGeometry<THREE.NormalBufferAttributes>[][] =>{
  const faces: THREE.BufferGeometry<THREE.NormalBufferAttributes>[][] = []
  maxes.forEach((axeMax, axeIndex, maxes)=>{
    const face: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] = [];
    for (let axeCount=1 ; axeCount<=axeMax ; axeCount++){
      const line = getLine(maxes, axeCount, axeIndex, false)
      face.push(new THREE.BufferGeometry().setFromPoints(line))
      const reversedLine = getLine(maxes, axeCount, axeIndex, true)
      face.push(new THREE.BufferGeometry().setFromPoints(reversedLine))
    }
    faces.push(face)
  })
  return faces
  
}

const getLine = (maxes: number[], axeCount: number, axeIndex: number, isReversed: boolean): [THREE.Vector3, THREE.Vector3] =>{
  const p1: TCoord = [axeCount, 0, 0]
  const p2: TCoord = [axeCount, axeIndex <2 ? maxes[axeIndex]+1 : maxes[0], 0]
  const rotatedP1 = rotate(isReversed ? getAxeReversedCoord(p1) : p1,axeIndex)
  const rotatedP2 = rotate(isReversed ? getAxeReversedCoord(p2) : p2,axeIndex)
      return [
        new THREE.Vector3(...rotatedP1),
        new THREE.Vector3(...rotatedP2),
      ]
}

const rotate = (arr: number[], n: number): number[] =>{
  for(let i=0; i<n; i++){
    arr.unshift(arr.pop() as number)
  }
  return arr
}

const getAxeReversedCoord = (point: TCoord): TCoord =>{
  return [point[1], point[0], point[2]]
}
