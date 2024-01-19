import React, { useEffect, useState } from "react";
import { CryptoSubscription } from "../utils/crypto";
import { listItemAvatarClasses } from "@mui/material";


const CryptoPage = () => {
    const [lastData , setLastData] = useState<number[]>([]);
  

  useEffect(() => {
    const devises = ["btcusd", "btceur", "btcgbp"];
    const btcCrypto = new CryptoSubscription(devises)

    btcCrypto.getData(data=>{
        console.log("=> GOT USD : ", data)
        setLastData(data)
    })
    return () => {
      btcCrypto.close();
    };
  }, []);

  return <div>
    {lastData.map((n,i)=><p key={i}>{n}</p>)}
  </div>;
};

export default CryptoPage;
