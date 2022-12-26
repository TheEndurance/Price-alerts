import DataProviderFactory from '../dataProviders/DataProviderFactory.js';

export async function getSymbols(req, res) {
  const apiDataProvider = DataProviderFactory.get({ providerName: req.params.provider, marketType: req.params.market, instanceType: 'api' });
  const response = await apiDataProvider.getSymbols();
  const options = response.map((symbol) => {
    return {
      display: symbol.name,
      value: symbol.name
    };
  });
  // console.log("test:", response);
  return res.json({
    options
  });
}