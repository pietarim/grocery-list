import express from 'express';
import { createUser } from '../controllers/user';

const router = express.Router();

router.get('/', async (_req, res) => {
  createUser(_req, res);
});

export default router;