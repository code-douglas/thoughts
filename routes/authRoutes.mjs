import express from 'express';
import AuthController from '../controllers/AuthController.mjs';

const router = express.Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.loginPost);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);
router.get('/logout', AuthController.logout);

export default router;
