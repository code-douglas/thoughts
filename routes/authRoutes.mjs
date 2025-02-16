import express from 'express';
const router = express.Router();

import AuthController from '../controllers/AuthController.mjs';

console.log(AuthController);

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);


export default router;
