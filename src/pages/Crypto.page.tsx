import React, { useEffect, useState } from "react";
import { CryptoHistory, CryptoSubscription } from "../utils/crypto";
import { listItemAvatarClasses } from "@mui/material";
import Scene from "../components/Scene";
import { IPoint } from "../@types/coords";
import AnimatedScene from "../components/AnimatedScene";
import { ICryptoData } from "../@types/crypto.types";

// const getTCoord = (values: number[]): IPoint[] => {
//   return values.map((v) => {
//     return {
//       coord: [v / 1000, 0, 0],
//       size: 1,
//       color: "red",
//     };
//   });
// };

const CryptoPage = () => {
  const [lastData, setLastData] = useState<ICryptoData | null>(null);

  useEffect(() => {
    const devises = ["btcusd", "ethusd", "solusd"];
    const cryptoHistory = new CryptoHistory(devises, 60, 1);
    cryptoHistory.start(data=>{
      console.log("=> history : ", data)
      setLastData(data)
    })

    // const btcCrypto = new CryptoSubscription(devises);
    // btcCrypto.getData((data) => {
    //   console.log("=> GOT USD : ", data);
    //   setLastData(getTCoord(data));
    // });
    return () => {
      // btcCrypto.close();

    };
  }, []);

  return (
    <div>
      {/* {lastData.map((n,i)=><p key={i}>{n}</p>)} */}
      {lastData && <AnimatedScene data={lastData} />}
    </div>
  );
};

export default CryptoPage;
