import express from 'express';
import { getRandomRecipes, createRecipe } from '../controllers/recipes';

const router = express.Router();

router.get('/', async (req, res) => {
  const recipes = await getRandomRecipes(req, res);
  res.status(200).json(recipes);
});

router.post('/', async (req, res) => {
  await createRecipe(req, res);
});
