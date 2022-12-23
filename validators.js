import { body } from 'express-validator';
import Providers from './models/Providers/Providers.js';
import Markets from './models/Markets/Markets.js';

export const createAlertValidator = [
  body('alertprice').isNumeric(),
  body('provider').isString().custom(async (val, { req }) => {
    const provider = await Providers.findOne({ name: val }).exec();
    if (!provider) {
      return Promise.reject()
    }
    req.body.providerFromDb = provider;
    return Promise.resolve();
  }).withMessage('Invalid provider'),
  body('market').isString().custom(async (val, { req }) => {
    const provider = req.body.providerFromDb;
    const market = Markets.findOne({ name: val });
    if (!market) {
      return
      Promise.reject();
    } else {
      const marketInProvider = provider.markets.find(x => x === market._id);
      if (!marketInProvider) {
        return Promise.reject();
      }
    }
    req.body.marketFromDb = market;
    return Promise.resolve();
  }).withMessage('Invalid market type'),
  body('symbol').isString().custom(async (val, { req }) => {
    return Promise.resolve();
  }),
  body('email').isEmail()
];