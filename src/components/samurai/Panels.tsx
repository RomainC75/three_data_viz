import { Html } from '@react-three/drei'
import { useEffect, useState } from 'react';


interface PanelProps{
    panel: number;
}

const Panels = ({panel}: PanelProps) => {
    const [text, setText] = useState<text>("")
    
  return (
    <>
    
        <h3>
            HHHHHHHHHHHHHHHHHHHHEEEEEE
        
        </h3>
        <h1>
            {panel}
        </h1>

    </>
  )
}

export default Panels