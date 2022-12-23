import { WebsocketClient, InverseClient, LinearClient } from 'bybit-api';

const API_KEY = '';
const PRIVATE_KEY = '';

const linearlinearWebsocketConfig = {
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

const linearWebsocket = new WebsocketClient(linearlinearWebsocketConfig);

// subscribe to multiple topics at once
// linearWebsocket.subscribe(['position', 'execution', 'trade']);

// and/or subscribe to individual topics on demand

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
linearWebsocket.on('open', ({ linearWebsocketKey, event }) => {
  console.log('connection open for websocket with ID: ' + linearWebsocketKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
linearWebsocket.on('response', response => {
  console.log('response', response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
linearWebsocket.on('close', () => {
  console.log('connection closed');
});

// Optional: Listen to raw error events. Recommended.
linearWebsocket.on('error', err => {
  console.error('error', err);
});

const linearApi = new LinearClient({
  key: '',
  secret: '',
  testnet: false
},
  // requestLibraryOptions
);

// For public-only API calls, simply don't provide a key & secret or set them to undefined
// const client = new InverseClient({});

export { linearWebsocket, linearApi };
