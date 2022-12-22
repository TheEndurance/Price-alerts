import { body } from 'express-validator';

export const createAlertValidator = [
  body('alertprice').isNumeric(),
  body('symbol').isIn(['BTCUSDT', 'ETHUSDT']),
  body('email').isEmail()
];