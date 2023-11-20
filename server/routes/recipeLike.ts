import express from 'express';

const router = express.Router();

router.put('/id', async (_req, res) => {
  res.status(200).json({ message: 'Recipe updated' });
});