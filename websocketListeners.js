import DataProviderFactory from './dataProviders/dataProviderFactory.js';
import { bybitLinearWebsocketEventHandler } from './websocketEventHandlers/bybit/eventHandlers.js';

const bybitLinearWebsocket = DataProviderFactory.get({ name: 'bybit', marketType: 'linear', instanceType: 'websocket'});

bybitLinearWebsocket.on('update', data => {
  bybitLinearWebsocketEventHandler(data);
});

