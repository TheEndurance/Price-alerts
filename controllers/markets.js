import Markets from '../models/Markets/Markets.js';
import Providers from '../models/Providers/Providers.js';

export async function getMarkets(req, res) {
  const provider = await Providers.findOne({ name: req.params.provider }).exec();
  if (!provider) {
    return res.json({
      options: []
    });
  }
  const markets = await Markets.find({ _id: { $in: provider.markets } }).exec();

  const options = markets.map((market) => {
    return {
      display: market.display,
      value: market.name
    };
  });
  return res.json({
    options
  });
}