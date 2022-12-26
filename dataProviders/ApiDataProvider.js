import dayjs from 'dayjs';

import DataProvider from './DataProvider.js';

export default class ApiDataProvider extends DataProvider {
  constructor(providerInstance, options) {
    super(providerInstance, options);
  }

  getInstanceType() {
    return 'api';
  }

  async getLatestPrice(symbol) {
    const client = this.getBaseClient();
    if (this.getProviderName() === 'bybit') {
      if (this.getMarketType() === 'spotv3') {
        const response = await client.getLastTradedPrice(symbol);
        return parseFloat(response.result.price);
      }
      const response = await client.getIndexPriceKline({ symbol, interval: 1, from: dayjs().unix() - 60, limit: 1 });
      return parseFloat(response.result[0].close);
    }
  }

  async getSymbols() {
    const client = this.getBaseClient();
    const providerName = this.getProviderName();
    const marketType = this.getMarketType();
    const response = await client.getSymbols();
    if (providerName === 'bybit') {
      if (marketType === 'spotv3') {
        return response.result.list;
      }
      else if (marketType === 'linear' || marketType === 'inverse') {
        return response.result;
      }
    }
  }
}