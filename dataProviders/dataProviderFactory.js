import {
  linearApi as bybitLinearApi,
  inverseApi as bybitInverseApi,
  spotApi as bybitSpotApi,
  linearWebsocket as bybitLinearWebsocket,
  inverseWebsocket as bybitInverseWebsocket,
  spotWebsocket as bybitSpotWebsocket
} from './bybit/bybit.js';

export default class DataProviderFactory {

}

DataProviderFactory.PROVIDERS = {};

DataProviderFactory.makeKey = (name, marketType, instanceType) => {
  return  `${name}${marketType}${instanceType}`;
}


DataProviderFactory.register = (provider, instance) => {
  const { name, marketType, instanceType } = provider;
  const key = DataProviderFactory.makeKey(name, marketType, instanceType);
  DataProviderFactory.PROVIDERS[key] = instance;
};

DaataProviderFactory.get = (provider) => {
  const { name, marketType, instanceType } = provider;
  const key = DataProviderFactory.makeKey(name, marketType, instanceType);
  if (!DataProviderFactory.PROVIDERS[key]) {
    throw new Error("invalid provider")  ;
  }
  return DataProviderFactory.PROVIDERS[key];
}


//bybit
DataProviderFactory.register({ name : "bybit", marketType: "linear", instanceType: "api" }, bybitLinearApi);
DataProviderFactory.register({ name : "bybit", marketType: "inverse", instanceType: "api" }, bybitInverseApi);
DataProviderFactory.register({ name : "bybit", marketType: "spot", instanceType: "api" }, bybitSpotApi);

DataProviderFactory.register({ name : "bybit", marketType: "linear", instanceType: "websocket" }, bybitLinearWebsocket);
DataProviderFactory.register({ name : "bybit", marketType: "inverse", instanceType: "websocket" }, bybitInverseWebsocket);
DataProviderFactory.register({ name : "bybit", marketType: "spot", instanceType: "websocket" }, bybitSpotWebsocket);

//binance



//coinbase




