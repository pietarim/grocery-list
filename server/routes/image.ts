import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:name', (_req, res) => {
  const { name } = _req.params;
  const imagePath = path.join(__dirname, `../images/${name}.png`);
  console.log(name);
  res.sendFile(imagePath);
  console.log('get image');
});

export default router;