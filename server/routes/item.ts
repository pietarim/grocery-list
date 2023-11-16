import express from 'express';
import { getItems } from '../query/item';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  const items = await getItems();
  if (!items) {
    return next(new Error('No items found'));
  }
  res.status(200).json(items);
});

export default router;