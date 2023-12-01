import express from 'express';
import { registerUser, login, getAccessToken } from '../controllers/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/access-token', getAccessToken);

export default router;