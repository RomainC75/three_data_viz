import { RefObject, useRef, useState } from "react";
import { IData } from "../../@types/crypto.types";

export function use2DRefs<T>(currencyData: IData): RefObject<T>[][] {
    const [refs, setRefs] = useState<RefObject<T>[][]>([]);
    // const newRefs: MutableRefObject<T>[][]  = Object.keys(data).map(currency =>
    //     data[currency].map(() => useRef<T>())
    // );
  
    // useEffect(() => {
      
    //   setRefs(newRefs);
    // }, [data]);

    const refss = Object.keys(currencyData).map(currency=>{
        return currencyData[currency].map((_) => useRef<T>(null))
    })    
    setRefs(refss)
    // return refs;
    // setRefs(currencyData.map(() => useRef<T>(null)))
    return refs;
  }