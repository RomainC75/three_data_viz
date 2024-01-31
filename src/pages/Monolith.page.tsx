import { Canvas } from '@react-three/fiber'
import MonolithScene from '../components/Monolith/MonolithScene'

const MonolithPage = () => {
  return (
    <div className="w-full h-screen bg-transparent">
        <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 17],
        }}
        className={`w-full h-screen bg-black`}
      >
        <MonolithScene/>
      </Canvas>
    </div>
  )
}

export default MonolithPage