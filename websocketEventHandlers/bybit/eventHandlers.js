import PriceAlerts from '../../models/PriceAlerts/PriceAlerts.js';
import { sendEmailAlert } from '../../email.js';

async function bybitLinearWebsocketEventHandler(data) {
  const close = data.data[0].close
  const symbol = data.topic.split(".")[2];
  const alerts =  await PriceAlerts.find({ market: "linear", provider: "bybit", symbol }).exec();
  alerts.forEach(async (alert) => {
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
        await PriceAlerts.deleteOne({ _id: alert._id })
        sendEmailAlert(alert).catch((err) => console.error(err));
        console.log("alert deleted: ", alert);
      }
      catch (e) {
        console.error(e);
      }
    }
  });
}

export { bybitLinearWebsocketEventHandler };