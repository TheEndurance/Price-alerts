import { body } from 'express-validator';
import Providers from './models/Providers/Providers.js';
import Markets from './models/Markets/Markets.js';

export const createAlertValidator = [
  body('alertprice').isNumeric().withMessage('Invalid alert price'),
  body('provider').custom(async (val, { req }) => {
    const provider = await Providers.findOne({ name: val }).exec();
    console.log(provider);
    if (!provider) {
      return Promise.reject('Invalid provider');
    }
    req.body.providerFromDb = provider;
    return Promise.resolve();
  }),
  body('market').custom(async (val, { req }) => {
    const provider = req.body.providerFromDb;
    const market = Markets.findOne({ name: val });
    if (!market || !provider) {
      return Promise.reject('Invalid market type');
    } else {
      // const marketInProvider = provider.markets.find(x => x === market._id);
      // if (!marketInProvider) {
      //   return Promise.reject('Invalid market type for chosen provider, contact admin');
      // }
    }
    req.body.marketFromDb = market;
    return Promise.resolve();
  }),
  body('symbol').isString().custom(async (val, { req }) => {
    return Promise.resolve();
  }),
  body('email').isEmail().withMessage('Invalid email address')
];