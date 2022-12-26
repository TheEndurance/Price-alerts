export default class DataProvider {
  constructor(dataProvider, options) {
    const { providerName, marketType } = options;
    this.providerName = providerName;
    this.marketType = marketType;
    this.baseClient = dataProvider;
  }

  getBaseClient() {
    return this.baseClient;
  }

  getProviderName() {
    return this.providerName;
  }

  getMarketType() {
    return this.marketType;
  }

  getInstanceType() {
    throw new Error('Method getInstanceType must be implemented by subclass');
  }
}