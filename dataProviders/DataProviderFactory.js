import {
  linearApi as bybitLinearApi,
  inverseApi as bybitInverseApi,
  spotApi as bybitSpotApi,
  linearWebsocket as bybitLinearWebsocket,
  inverseWebsocket as bybitInverseWebsocket,
  spotWebsocket as bybitSpotWebsocket
} from './bybit/bybit.js';

import ApiDataProvider from './ApiDataProvider.js';
import WebsocketDataProvider from './WebsocketDataProvider.js';


export default class DataProviderFactory {

}

DataProviderFactory.PROVIDERS = {};

DataProviderFactory.makeKey = (providerName, marketType, instanceType) => {
  return `${providerName}${marketType}${instanceType}`;
}


DataProviderFactory.register = (dataProvider) => {
  const providerName = dataProvider.getProviderName();
  const marketType = dataProvider.getMarketType();
  const instanceType = dataProvider.getInstanceType();
  const key = DataProviderFactory.makeKey(providerName, marketType, instanceType);
  DataProviderFactory.PROVIDERS[key] = dataProvider;
};

DataProviderFactory.get = (params) => {
  const { providerName, marketType, instanceType } = params;
  const key = DataProviderFactory.makeKey(providerName, marketType, instanceType);
  if (!DataProviderFactory.PROVIDERS[key]) {
    throw new Error("invalid provider with key: " + key);
  }
  return DataProviderFactory.PROVIDERS[key];
}




//bybit
const bybitLinearApiDataProvider = new ApiDataProvider(bybitLinearApi, { providerName: "bybit", marketType: "linear" });
const bybitInverseApiDataProvider = new ApiDataProvider(bybitInverseApi, { providerName: "bybit", marketType: "inverse" });
const bybitSpotApiDataProvider = new ApiDataProvider(bybitSpotApi, { providerName: "bybit", marketType: "spotv3" });
DataProviderFactory.register(bybitLinearApiDataProvider);
DataProviderFactory.register(bybitInverseApiDataProvider);
DataProviderFactory.register(bybitSpotApiDataProvider);

const bybitLinearWebsocketProvider = new WebsocketDataProvider(bybitLinearWebsocket, { providerName: 'bybit', marketType: 'linear' });
const bybitInverseWebsocketProvider = new WebsocketDataProvider(bybitInverseWebsocket, { providerName: 'bybit', marketType: 'inverse'});
const bybitSpotWebsocketProvider = new WebsocketDataProvider(bybitSpotWebsocket, { providerName: 'bybit', marketType: 'spotv3'});

DataProviderFactory.register(bybitLinearWebsocketProvider);
DataProviderFactory.register(bybitInverseWebsocketProvider);
DataProviderFactory.register(bybitSpotWebsocketProvider);
//binance



//coinbase




