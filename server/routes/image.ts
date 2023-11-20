import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:name', (_req, res) => {
  const { name } = _req.params;
  const imagePath = path.join(__dirname, `../images/poridge_for_recipe.png`);
  console.log(name);
  res.sendFile(imagePath);
  console.log('get image');
});

export default router;