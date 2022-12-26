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
}