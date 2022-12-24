import './server.js';
import './websocketListeners.js';

// const bybitLinearWebsocket = DataProviderFactory.get({ name: 'bybit', marketType: 'linear', instanceType: 'websocket'});
// bybitLinearWebsocket.subscribe('candle.1.BTCUSDT');
// console.log(bybitLinearWebsocket.getWsStore().wsState.linearPublic.subscribedTopics);
// bybitLinearWebsocket.subscribe('candle.1.ETHUSDT');

// bybitClient.getIndexPriceKline({ symbol: 'BTCUSDT', interval: 1, from: dayjs().unix() - 50, limit: 1})
//   .then(result => {
//     console.log(" result: ", result);
//   })
//   .catch(err => {
//     console.error(" error: ", err);
//   });