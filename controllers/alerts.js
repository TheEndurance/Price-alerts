import dayjs from 'dayjs';
import { validationResult } from 'express-validator';
import DataProviderFactory from '../dataProviders/DataProviderFactory.js';
import PriceAlerts from '../models/PriceAlerts/PriceAlerts.js';
import _ from 'lodash';


// TODO: this should be retrieved from database
const providers = {
  label: 'Providers',
  id: 'provider',
  name: 'provider',
  loading: false,
  blankOptionDisplay: "Select a provider",
  options: [{
    display: 'Bybit',
    value: 'bybit'
  },
  {
    display: "Binance",
    value: "binance"
  }
  ]
};
const markets = {
  label: 'Market Type',
  id: 'market',
  name: 'market',
  loading: false,
  blankOptionDisplay: "Select a market type",
  options: []
};
const symbols = {
  label: 'Ticker',
  id: 'symbol',
  name: 'symbol',
  loading: false,
  blankOptionDisplay: "Select a ticker",
  options: []
};

export async function createAlert(req, res) {
  // On post request
  console.log("in post", req.body);
  try {
    validationResult(req).throw();
    // TODO: get exchange and market types
    const apiDataProvider = DataProviderFactory.get({ providerName: req.body.provider, marketType: req.body.market, instanceType: 'api' });
    const createdPrice = await apiDataProvider.getLatestPrice(req.body.symbol);
    const alert = {
      symbol: req.body.symbol,
      createdPrice,
      alertPrice: parseFloat(req.body.alertprice),
      provider: req.body.provider,
      market: req.body.market,
      emailAddress: req.body.email
    };
    alert.direction = alert.createdPrice > alert.alertPrice ? 'down' : 'up';

    console.log(alert);
    await PriceAlerts.create(alert);

    const websocketDataProvider = DataProviderFactory.get({ providerName: req.body.provider, marketType: req.body.market, instanceType: 'websocket' });

    const subExists = websocketDataProvider.isSubbed(req.body.symbol);
    if (!subExists) {      
      websocketDataProvider.createPriceUpdateSub(req.body.symbol);
    }
    res.json({
      success: {
        message: `Alert for ${req.body.symbol} successfully created`
      }
    });
  } catch (err) {
    // console.log(err.mapped());
    // console.log(err.array());
    const errors = err.array ? err.array() : [ { msg: `Server error - ${err.message}` } ];
    res.json({
      errors: {
        errors
      }
    });
  }
}

export async function viewAlertForm(req, res) {
   res.render('home', {
     providers,
     markets,
     symbols
  });
}
