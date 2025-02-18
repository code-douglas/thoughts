import express from 'express';
const router = express.Router();
import ToughtsController from '../controllers/ToughtsController.mjs';
import checkUserAuth from '../middlewares/checkUserAuth.mjs';

router.get('/add', checkUserAuth, ToughtsController.createTought);
router.post('/add', checkUserAuth, ToughtsController.createToughtSave);
router.get('/dashboard', checkUserAuth, ToughtsController.dashboard);
router.get('/', ToughtsController.showToughts);

export default router;
