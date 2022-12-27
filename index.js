import './server.js';
import './websocketListeners.js';
import DataProviderFactory from './dataProviders/DataProviderFactory.js';
import PriceAlerts from './models/PriceAlerts/PriceAlerts.js';

const providerMarketTypeMap = {
  'bybit': ['spotv3', 'linear', 'inverse']
}

async function main() {
  const totalSubs = [];
  const providerNames = Object.keys(providerMarketTypeMap);
  for (const providerName of providerNames) {
    try {
      const markets = providerMarketTypeMap[providerName];
      for (const market of markets) {
       const symbols = await PriceAlerts.distinct('symbol', { provider: providerName, market })
        const websocketDataProvider = DataProviderFactory.get({ providerName, marketType: market, instanceType: 'websocket'});
        symbols.forEach((symbol) => {
          if (!websocketDataProvider.isSubbed(symbol)) {
            websocketDataProvider.createPriceUpdateSub(symbol);
          }
        });
        const subs = websocketDataProvider._getSubs();
        totalSubs.push(subs); 
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(totalSubs);
}

main();


// const bybitLinearWebsocket = DataProviderFactory.get({ name: 'bybit', marketType: 'linear', instanceType: 'websocket'});
// console.log(bybitLinearWebsocket.getWsStore().wsState.linearPublic.subscribedTopics);
// bybitLinearWebsocket.subscribe('candle.1.ETHUSDT');

// bybitClient.getIndexPriceKline({ symbol: 'BTCUSDT', interval: 1, from: dayjs().unix() - 50, limit: 1})
//   .then(result => {
//     console.log(" result: ", result);
//   })
//   .catch(err => {
//     console.error(" error: ", err);
//   });