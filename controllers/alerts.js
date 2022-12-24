import dayjs from 'dayjs';
import { validationResult } from 'express-validator';
import DataProviderFactory from '../dataProviders/dataProviderFactory.js';
import PriceAlerts from '../models/PriceAlerts/PriceAlerts.js';
import _ from 'lodash';

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
    const errors = await validationResult(req).throw();
    // TODO: get exchange and market types
    const apiDataProvider = DataProviderFactory.get({ name: req.body.provider, marketType: req.body.market, instanceType: 'api' });
    const response = await apiDataProvider.getIndexPriceKline({ symbol: req.body.symbol, interval: 1, from: dayjs().unix() - 60, limit: 1 })
    const createdPrice = parseFloat(response.result[0].close);
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
    return res.json({
      success: {
        message: `Alert for ${req.body.symbol} successfully created`
      }
    });

  } catch (err) {
    console.log("rendering with:", err.array());
    return res.json({
      errors: err.array()
    });
    // console.log(err.mapped());
    // console.log(err.array());
  }
}

export async function viewAlertForm(req, res) {
   res.render('home', {
     providers,
     markets,
     symbols
  });
}