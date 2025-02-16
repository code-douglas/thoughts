import express from 'express';
const router = express.Router();
import ToughtsController from '../controllers/ToughtsController.mjs';

router.get('/', ToughtsController.showToughts);

export default router;
