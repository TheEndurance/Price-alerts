import DataProviderFactory from '../dataProviders/dataProviderFactory.js';

export async function getSymbols(req, res) {
  const apiDataProvider = DataProviderFactory.get({ name: req.params.provider, marketType: req.params.market, instanceType: 'api'});
  const response = await apiDataProvider.getSymbols();
  const options = response.result.map((symbol) => {
    return {
      display: symbol.name,
      value: symbol.name
    };
  });
  return res.json({
    options
  });
}