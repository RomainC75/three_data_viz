import React from 'react'
import * as THREE from 'three';


interface GridProp {
    maxX: number
    maxY: number
    maxZ: number
}

const getLinePoints = (x: number,y: number,z: number) =>{
    const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
    ];
    return new THREE.BufferGeometry().setFromPoints(points)
}

const getXYZGridLines = (maxX: number, maxY: number, maxZ: number) =>{

}

const Grid = ({maxX, maxY, maxZ}: GridProp) => {

    const xLineGeometry = getLinePoints(maxX, 0, 0)
    const yLineGeometry = getLinePoints(0, maxY, 0)
    const zLineGeometry = getLinePoints(0, 0, maxZ)

    

  return (
    <>
        <line geometry={xLineGeometry}>
          <lineBasicMaterial attach="material" color={'blue'} linewidth={1} linecap={'round'} linejoin={'round'} />
        </line>
        <line geometry={yLineGeometry}>
          <lineBasicMaterial attach="material" color={'red'} linewidth={1} linecap={'round'} linejoin={'round'} />
        </line>
        <line geometry={zLineGeometry}>
          <lineBasicMaterial attach="material" color={'green'} linewidth={1} linecap={'round'} linejoin={'round'} />
        </line>

        
    </>
  )
}

export default Grid