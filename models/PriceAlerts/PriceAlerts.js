import mongoose from 'mongoose';
const PriceAlertSchema = new mongoose.Schema({
  createdPrice: Number,
  alertPrice: Number,
  direction: String,
  emailAddress: String,
  provider: {
    type: String,
    enum: ['bybit', 'coinbase', 'binance'],
    default: 'bybit'
  },
  market: {
    type: String,
    enum: ['linear', 'spot', 'inverse'],
    default: 'linear'
  }
});

const PriceAlerts = mongoose.model("PriceAlerts", PriceAlertSchema);

export default PriceAlerts;