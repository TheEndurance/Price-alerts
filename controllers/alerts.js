import dayjs from 'dayjs';
import { validationResult } from 'express-validator';
import { bybitClient } from '../bybit.js';
import PriceAlerts from '../models/PriceAlerts/PriceAlerts.js';

export async function createAlert(req, res) {
  // On post request
  console.log("in post", req.body);
  try {
    validationResult(req).throw();
    // TODO: get exchange and market types
    const response = await bybitClient.getIndexPriceKline({ symbol: req.body.symbol, interval: 1, from: dayjs().unix() - 60, limit: 1 })
    const createdPrice = parseFloat(response.result[0].close);
    const alert = {
      symbol: req.body.symbol,
      createdPrice,
      alertPrice: parseFloat(req.body.alertprice),
      provider: req.body.provider,
      market: req.body.market,
      emailAddress: req.body.email
    };
    alert.direction = alert.createdPrice > alert.alertPrice ? "down" : "up";

    console.log(alert);
    await PriceAlerts.create(alert);

  } catch (err) {
    res.status(400).json();
  }
}

export async function viewAlertForm(req, res) {
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
  }
   res.render('home', {
     providers,
     markets,
     symbols
  });
}