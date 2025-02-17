import express from 'express';
const router = express.Router();
import ToughtsController from '../controllers/ToughtsController.mjs';
import checkUserAuth from '../middlewares/checkUserAuth.mjs';

router.get('/dashboard', checkUserAuth, ToughtsController.dashboard);
router.get('/', ToughtsController.showToughts);

export default router;
