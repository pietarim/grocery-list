import express from 'express';
import { returnMostLikedRecipes, getIntroduceRecipes, createRecipe, updateRecipe, deleteRecipe, getUsersOwnRecipes, likeRecipeController } from '../controllers/recipes';
import { parseString, parseNumber, parseIncredient, parseBoolean } from '../config/utils';
import { get } from 'http';
import { userExtractor } from '../middleware/userExtractor';

const router = express.Router();

router.get('/introductory', getIntroduceRecipes);
router.get('/mostliked', returnMostLikedRecipes);
router.get('/user', userExtractor, getUsersOwnRecipes);
router.post('/introductory', getIntroduceRecipes);

router.put('/like/:id', userExtractor, likeRecipeController);

router.post('/', userExtractor, createRecipe);

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, global, ingredients, ownerId } = req.body;
  const parsedOwnerId = parseNumber(ownerId);
  const parsedId = parseString(id);
  const parsedName = parseString(name);
  const parsedDescription = parseString(description);
  const parsedGlobal = parseBoolean(global);

  const numberId = Number(parsedId);

  const recipe = {
    name: parsedName,
    description: parsedDescription,
    ownerId: parsedOwnerId,
    global: parsedGlobal
  };

  await updateRecipe(recipe, numberId, ingredients);
  res.status(200).json({ message: 'Recipe updated' });
});

router.delete('/:id', userExtractor, deleteRecipe);

export default router;