export class CryptoSubscription {
  currenciesWS: WebSocket[];
  lastValues: number[] = []

  constructor(currencyPairs: string[]) {
    this.lastValues = Array(currencyPairs.length).fill(0)
    this.currenciesWS = currencyPairs.map((currencyPair, index)=> this.init(currencyPair, index))
  }

  getData(fn: (obj: number[]) => void) {
    // const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

    setInterval(()=>{
        fn(this.lastValues)
    },1000)
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
        this.lastValues[index]= response.event === 'data' ? parseInt(response.data.asks[0][0]) : 0;
    };
    return ws
  }

  close() {
    this.currenciesWS.forEach(ws=>ws.close());
  }


}
