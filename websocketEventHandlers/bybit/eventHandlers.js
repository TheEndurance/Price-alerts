import DataProviderFactory from '../../dataProviders/DataProviderFactory.js';
import PriceAlerts from '../../models/PriceAlerts/PriceAlerts.js';
import { sendEmailAlert } from '../../email.js';

async function updateEventHandler(data, options = {}) {
  const { providerName, marketType } = options
  const close = data.data[0].close
  const symbol = data.topic.split(".")[2];
  const alerts =  await PriceAlerts.find({ market: marketType, provider: providerName, symbol }).exec();
  const symbolDeletedMap = {};
  for (const alert of alerts) {
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
      try {
        await PriceAlerts.deleteOne({ _id: alert._id });
        symbolDeletedMap[alert.symbol] = true;
        sendEmailAlert(alert).catch((err) => console.error(err));
        console.log("alert deleted: ", alert);
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  // potential race condition situation with deleting a sub and creating a sub ?
  const websocketDataProvider = DataProviderFactory.get({ marketType, providerName, instanceType: 'websocket' });
  const symbols = Object.keys(symbolDeletedMap);
  for (const symbol of symbols) {
   const alertsCount = await PriceAlerts.countDocuments({ market: marketType, provider: providerName, symbol}).exec();
    if (alertsCount === 0) {
      websocketDataProvider.deletePriceUpdateSub(symbol);
    } 
  }
}

export { updateEventHandler };