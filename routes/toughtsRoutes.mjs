import express from 'express';
import ToughtsController from '../controllers/ToughtsController.mjs';
import checkUserAuth from '../middlewares/checkUserAuth.mjs';

const router = express.Router();

router.get('/add', checkUserAuth, ToughtsController.createTought);
router.post('/add', checkUserAuth, ToughtsController.createToughtSave);
router.get('/dashboard', checkUserAuth, ToughtsController.dashboard);
router.post('/remove', checkUserAuth, ToughtsController.removeTought);
router.get('/', ToughtsController.showToughts);

export default router;
