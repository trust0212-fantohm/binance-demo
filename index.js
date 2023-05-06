const binance = require("binance-api-node").default;
const client = binance();

const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

let latestWss;
function getOhlc() {
  client
    .candles({
      symbol: "BTCUSDT",
      interval: "1m",
      limit: 1,
    })
    .then((candles) => {
      console.log("ohlc: ", candles);
    });
}

ws.on('message', message => {
  const trade = JSON.parse(message);
  const { e: eventType, E: eventTime, s: symbol, p: price, q: quantity } = trade;
  latestWss = {
    price,
    eventTime
  };

});

getOhlc();
setInterval(() => {
    getOhlc();
}, 60 * 1000)

// setInterval(() => {
//   console.log(latestWss)
// }, 500);
