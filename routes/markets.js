import express from 'express';

const router = express.Router();

import {
  getMarkets
} from '../controllers/markets.js';

router.get('/markets/:provider', getMarkets);


export default router;