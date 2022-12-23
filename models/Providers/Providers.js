import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  markets: {
    type: [String],
    required: true,
    default: []
  }
});

const Providers = mongoose.model("Providers", ProviderSchema);

export default Providers;