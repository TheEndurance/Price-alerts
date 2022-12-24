import { WebsocketClient, InverseClient, LinearClient, SpotClientV3 } from 'bybit-api';

const API_KEY = '';
const PRIVATE_KEY = '';

const linearWebsocketConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,

  /*
    The following parameters are optional:
  */

  // defaults to true == livenet
  // testnet: false

  // NOTE: to listen to multiple markets (spot vs inverse vs linear vs linearfutures) at once, make one WebsocketClient instance per market

  market: 'linear',
  // market: 'inverse',
  // market: 'spot',
  // market: 'spotv3',
  // market: 'usdcOption',
  // market: 'usdcPerp',
  // market: 'unifiedPerp',
  // market: 'unifiedOption',

  // how long to wait (in ms) before deciding the connection should be terminated & reconnected
  // pongTimeout: 1000,

  // how often to check (in ms) that linearWebsocket connection is still alive
  // pingInterval: 10000,

  // how long to wait before attempting to reconnect (in ms) after connection is closed
  // reconnectTimeout: 500,

  // config options sent to RestClient (used for time sync). See RestClient docs.
  // restOptions: { },

  // config for axios used for HTTP requests. E.g for proxy support
  // requestOptions: { }

  // override which URL to use for websocket connections
  // linearWebsocketUrl: 'linearWebsockets://stream.bytick.com/realtime'
};
const inverseWebsocketConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,
  market: 'inverse'
};
const spotWebsocketConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,
  market: 'spotv3'
};

const linearWebsocket = new WebsocketClient(linearWebsocketConfig);
const inverseWebsocket = new WebsocketClient(inverseWebsocketConfig);
const spotWebsocket = new WebsocketClient(spotWebsocketConfig);

const linearApi = new LinearClient({
  key: '',
  secret: '',
  testnet: false
});
const inverseApi = new InverseClient({
  key: '',
  secret: '',
  testnet: false
});
const spotApi = new SpotClientV3({
  key: '',
  secret: '',
  testnet: false
});

export { linearWebsocket, inverseWebsocket, spotWebsocket, linearApi, inverseApi, spotApi };
