import express from 'express';

const router = express.Router();

import {
  getSymbols
} from '../controllers/symbols.js';

router.get('/symbols/:provider/:market', getSymbols);


export default router;