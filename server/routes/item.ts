import express from 'express';
import { addItem, getAllItems, updateItem } from '../controllers/item';
import { parseString, parseNumber } from '../config/utils';

const router = express.Router();

router.post('/', async (_req, res, next) => {
  await addItem(_req, res, next);
});

router.get('/', async (_req, res, next) => {
  await getAllItems(_req, res, next);
});

router.put('/:id', async (_req, res, next) => {
  await updateItem(_req, res, next);
});

router.delete('/:id', async (req, res, next) => { // TODO: tää ei oo käytössä
  const { id } = req.params;
  if (!id) {
    throw new Error('Missing id');
  }
  const parsedId = parseString(id);
  if (!parsedId) {
    throw new Error('Invalid id');
  }

}
);

export default router;