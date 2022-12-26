import DataProviderFactory from './dataProviders/DataProviderFactory.js';
import { bybitLinearWebsocketEventHandler } from './websocketEventHandlers/bybit/eventHandlers.js';

const bybitLinearWebsocketDataProvider = DataProviderFactory.get({ providerName: 'bybit', marketType: 'linear', instanceType: 'websocket'});

bybitLinearWebsocketDataProvider.on('update', data => {
  bybitLinearWebsocketEventHandler(data);
});

