import React, { useEffect, useState } from "react";
import { CryptoSubscription } from "../utils/crypto";
import { listItemAvatarClasses } from "@mui/material";
import Scene from "../components/Scene";
import { IPoint } from "../@types/coords";
import AnimatedScene from "../components/AnimatedScene";

const getTCoord = (values: number[]): IPoint[] => {
  return values.map((v) => {
    return {
      coord: [v / 1000, 0, 0],
      size: 1,
      color: "red",
    };
  });
};

const CryptoPage = () => {
  const [lastData, setLastData] = useState<IPoint[]>([]);

  useEffect(() => {
    const devises = ["btcusd", "btceur", "btcgbp"];
    const btcCrypto = new CryptoSubscription(devises);

    btcCrypto.getData((data) => {
      console.log("=> GOT USD : ", data);
      setLastData(getTCoord(data));
    });
    return () => {
      btcCrypto.close();
    };
  }, []);

  return (
    <div>
      {/* {lastData.map((n,i)=><p key={i}>{n}</p>)} */}
      <AnimatedScene data={lastData} />
    </div>
  );
};

export default CryptoPage;
