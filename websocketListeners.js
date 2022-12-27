import DataProviderFactory from './dataProviders/DataProviderFactory.js';
import { updateEventHandler } from './websocketEventHandlers/bybit/eventHandlers.js';

const websocketProviderMarketTypeMaps = {
  bybit: ['linear','inverse','spotv3']
}

const providerNames = Object.keys(websocketProviderMarketTypeMaps)
for (const providerName of providerNames) {
  const marketTypes = websocketProviderMarketTypeMaps[providerName];
  for (const marketType of marketTypes) {
    const websocketDataProvider = DataProviderFactory.get({ providerName, marketType, instanceType: 'websocket'});
    websocketDataProvider.on('update', data => {
      updateEventHandler(data);
    })
  }
}


