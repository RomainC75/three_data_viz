import { getLinePoints, getXYZGridLines } from '../utils/grid.helper';

interface GridProp {
    maxX: number
    maxY: number
    maxZ: number
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

        {
          getXYZGridLines([maxX,maxY,maxZ]).map((face)=>face.map((line, index)=>
            <line geometry={line} key={`grid${index}`}>
          <lineBasicMaterial attach="material" color={'grey'} linewidth={1} linecap={'round'} linejoin={'round'} />
        </line>
            ))
        }
        
    </>
  )
}

export default Grid