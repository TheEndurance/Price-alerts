import mongoose from 'mongoose';
const PriceAlertSchema = new mongoose.Schema({
  createdPrice: {
    type: Number,
    required: true
  },
  alertPrice: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  emailAddress: String, // TODO: replace this with user information
});

const PriceAlerts = mongoose.model("PriceAlerts", PriceAlertSchema);

export default PriceAlerts;