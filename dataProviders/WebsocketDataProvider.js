import DataProvider from './DataProvider.js';

export default class WebsocketDataProvider extends DataProvider {
  constructor(providerInstance, options) {
    super(providerInstance, options);
  }

  getInstanceType() {
    return 'websocket';
  }

  on(eventType, callback) {
    const client = this.getBaseClient();
    client.on(eventType, callback);
  }

  _getSubs() {
    const client = this.getBaseClient();
    const wsStore = client.getWsStore();
    const topics = wsStore.getTopicsByKey();
    const providerName = this.getProviderName();
    const marketType = this.getMarketType();
    if (providerName === 'bybit') {
      if (marketType === 'linear') {
        const keys = topics['linearPublic'] ? topics['linearPublic'].keys() : [];
        return [...keys];
      } else if (marketType === 'spotv3') {
        const keys = topics['spotV3Public'] ? topics['spotV3Public'].keys() : [];
        return [...keys];
      } else if (marketType === 'inverse') {
        const keys = topics['inverse'] ? topics['inverse'].keys() : [];
        return [...keys];
      }
    }
    return [];
  }

  isSubbed(symbol) {
    const subKeys = this._getSubs();
    const found = subKeys.find(key => {
      const regExp = new RegExp(key, 'g');
      const result = regExp.exec(symbol);
      if (result === null) {
        return false;
      }
      else if (result[0] === symbol) {
        return true;
      }
    });
    return found;
  }

  deletePriceUpdateSub(symbol, options = {}) {
    const client = this.getBaseClient();
    client.unsubscribe(`candle.1.${symbol}`);
  }

  createPriceUpdateSub(symbol, options = {}) {
    const client = this.getBaseClient();
    client.subscribe(`candle.1.${symbol}`);
  }
}