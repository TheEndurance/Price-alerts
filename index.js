import dayjs from 'dayjs';
import "./server.js";
import DataProviderFactory from './dataProviders/dataProviderFactory.js';
import { sendEmailAlert } from './email.js';
import PriceAlerts from './models/PriceAlerts/PriceAlerts.js';

const bybitLinearWebsocket = DataProviderFactory.get({ name: 'bybit', marketType: 'linear', instanceType: 'websocket'});
bybitLinearWebsocket.subscribe('candle.1.BTCUSDT');
bybitLinearWebsocket.subscribe('candle.1.ETHUSDT');

// Listen to events coming from websockets. This is the primary data source
bybitLinearWebsocket.on('update', data => {
  // console.log('update', data);
  if (data.wsKey === "linearPublic") {
    const close = data.data[0].close
    const symbol = data.topic.split(".")[2];
    PriceAlerts.find({ market: "linear", provider: "bybit", symbol }).then((alerts) => {
      // console.log(alerts.length);
      alerts.forEach((alert) => {
        let fired = false;
        if (alert.direction === "down" && close <= alert.alertPrice) {
          console.warn("ALERT FIRED");
          fired = true;
        }
        else if (alert.direction === "up" && close >= alert.alertPrice) {
          console.warn("ALERT FIRED");
          fired = true;
        }
        if (fired) {
          PriceAlerts.deleteOne({ _id: alert._id }).then(() => {
            sendEmailAlert(alert).catch((err) => console.error(err));
            console.log("alert deleted: ", alert);
          });
        }
      });
    });
  }
});

// bybitClient.getIndexPriceKline({ symbol: 'BTCUSDT', interval: 1, from: dayjs().unix() - 50, limit: 1})
//   .then(result => {
//     console.log(" result: ", result);
//   })
//   .catch(err => {
//     console.error(" error: ", err);
//   });