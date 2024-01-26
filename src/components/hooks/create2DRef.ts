import { RefObject, useEffect, useRef, useState } from "react";
import { ICryptoData, IData } from "../../@types/crypto.types";

export function use2DRefs<T>(crypto: ICryptoData): RefObject<T>[][] {
  const [refs, setRefs] = useState<RefObject<T>[][]>([[]]);
  // const newRefs: MutableRefObject<T>[][]  = Object.keys(data).map(currency =>
  //     data[currency].map(() => useRef<T>())
  // );

  // useEffect(() => {
  // }, [data]);

  const refss = crypto.currencyPairs.map((currency) => {
    return crypto.data[currency].map((_) => useRef<T>(null));
  });
  // setRefs(refss)

  // return refs;
  // setRefs(currencyData.map(() => useRef<T>(null)))
  return refss;
}

export function useArrayOfRefs<T>(length: number): RefObject<T>[] {
  const [refs, setRefs] = useState<RefObject<T>[]>([]);
    
  const refss = Array(length)
    .fill(true)
    .map((_) => {
      return useRef<T>(null);
    });
  return refss;
}
