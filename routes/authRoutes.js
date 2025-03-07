// routes/authRoutes.js
import express from 'express';
import { getRegisterPage, postRegister, getLoginPage, postLogin, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/register', getRegisterPage);
router.post('/register', postRegister);

router.get('/login', getLoginPage);
router.post('/login', postLogin);

router.get('/logout', logout);

export default router;
