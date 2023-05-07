const axios = require('axios');
const { signMessage, getCurrentMinute, sleep, sleepUntilNextMinute } = require('./utils');



const krakenUrl = 'https://api.kraken.com/0/public/OHLC';

async function fetchOHLC(url, headers = undefined, isCoinbase = false) {
    if (isCoinbase) {
        const response = await axios.get(url, { headers } )
        return response.data;
    }
    const response = await axios.get(url);
    return response.data;
}

async function main() {
    await sleepUntilNextMinute();
    const binanceUrl = `https://api.binance.com/api/v3/klines?interval=1m&limit=2&symbol=BTCUSDT`;
    const binanceData_1 = await fetchOHLC(binanceUrl);

    await sleep(1000) // delay 1 second
    const time = getCurrentMinute();
    const binanceData0 = await fetchOHLC(binanceUrl);

    await sleep(1000) // delay 1 second
    const binanceData1 = await fetchOHLC(binanceUrl);

    // const path = `/api/v3/brokerage/products/BTC-USD/candles`;
    // const timestamp = time / 1000;
    // const str = timestamp + 'GET' + path;
    // const signature = signMessage(str, COINBASE_SECRET_KEY);
    // const headersRequest = {
    //     'Content-Type': 'application/json',
    //     'User-Agent': 'request',
    //     'CB-ACCESS-KEY': COINBASE_API_KEY,
    //     'CB-ACCESS-SIGN': signature,
    //     'CB-ACCESS-TIMESTAMP': timestamp,
    // };
    // const url = `https://api.coinbase.com/api/v3/brokerage/products/BTC-USD/candles?start=${timestamp - 60}&end=${timestamp}&granularity=ONE_MINUTE&limit=1`;

    // console.log('coinbase url: ', url);
    // const coinbaseData = await fetchOHLC(url, headersRequest, true);

    // const krakenParams = {
    //     pair: 'BTC/USD',
    //     interval: 1, // interval in minutes
    //     since: timestamp - 2*60, // fetch all available data
    // };
    
    // const krakenUrl = `https://api.kraken.com/0/public/OHLC?interval=1&pair=BTC/USD&since=${timestamp - 120}`
    // const krakenData = await fetchOHLC(krakenUrl);

    
    // const volume = parseFloat(binanceData[i][5]) + parseFloat(coinbaseData[i][5]) + parseFloat(krakenData[i][6]);

    // combinedData.push({
    //   timestamp,
    //   volume,
    // });

    // const kraken = krakenData.result['BTC/USD'];
    // const coinbase = coinbaseData.candles;

    console.log("time: ", time)
    console.log("binanceData just before exact minute: ", binanceData_1)
    console.log("binanceData at exact minute: ", binanceData0)
    console.log("binanceData with some delay (1 second): ", binanceData1)
    // console.log("coinbaseData: ", coinbase[coinbase.length - 1]);
    // console.log("krakenData: ", kraken[0]);

    // const volume = Number(binanceData[0][5]) + Number(coinbase[coinbase.length - 1].volume) + Number(kraken[0][6]);

    // console.log('volume: ', volume)
}

main()