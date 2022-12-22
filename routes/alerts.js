import express from 'express';
import { createAlertValidator } from '../validators.js';

const router = express.Router();

import {
  viewAlertForm,
  createAlert
} from '../controllers/alerts.js';

router.get('/', viewAlertForm);

router.post('/', createAlertValidator, createAlert);


export default router;