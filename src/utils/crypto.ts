import { ICryptoData, IData, ILightValue, IValue } from "../@types/crypto.types";

const dataInitializor: ILightValue = {
  value: 0,
  timestamp: 0,
  microtimestamp: 0,
}

export class CryptoSubscription {
  currenciesWS: WebSocket[];
  lastValues: IValue[] = [];
  refresh_delay_s: number;

  constructor(currencyPairs: string[], refresh_delay_s: number) {
    this.refresh_delay_s = refresh_delay_s
    this.lastValues = Array(currencyPairs.length).fill(0)
    this.currenciesWS = currencyPairs.map((currencyPair, index)=> this.init(currencyPair, index))
  }

  getData(fn: (obj: IValue[]) => void) {
    // const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

    setInterval(()=>{
        fn(this.lastValues)
    },this.refresh_delay_s*1000)
  }

  init(currencyPair: string, index: number) {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `order_book_${currencyPair}`,
      },
    };
    const ws = new WebSocket("wss://ws.bitstamp.net");
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        // console.log("=> response : ", response)
        const value: IValue = {
          currencyPair,
          value: response.event === 'data' ? parseInt(response.data.asks[0][0]) : 0,
          timestamp: parseInt(response.data.timestamp),
          microtimestamp: parseInt(response.data.microtimestamp)
        }
        this.lastValues[index] = value
    };
    return ws
  }
  close() {
    this.currenciesWS.forEach(ws=>ws.close());
  }
}

export class CryptoHistory extends CryptoSubscription{
  cryptoData: ICryptoData;
  constructor(currencyPairs: string[], period_s: number, refresh_delay_s: number){
    super(currencyPairs, refresh_delay_s);
    const data: IData = {}
     currencyPairs.forEach(currencyPair=>{
      const values: IValue[] = Array(Math.round(period_s/refresh_delay_s)).fill({
        ...dataInitializor,
        currencyPair
      })
      data[currencyPair] = values
    })
    this.cryptoData = {
      currencyPairs,
      refresh_delay_s,
      period_s,
      data
    }
    console.log("=< START crypto Data : ", this.cryptoData)
  }

  start(fn: (data: ICryptoData)=>void){
    this.getData((data)=>{
      data.forEach(value=>{
        this.cryptoData.data[value.currencyPair].shift()
        this.cryptoData.data[value.currencyPair].push({
          value: value.value,
          timestamp: value.timestamp,
          microtimestamp: value.timestamp
        })
      })
      fn(this.cryptoData)
    })
  }



  
}
