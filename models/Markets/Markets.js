import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  display: {
    type: String
  }
});

const Markets = mongoose.model("Markets", MarketSchema);

export default Markets;