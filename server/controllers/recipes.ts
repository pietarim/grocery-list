import { sequelize } from '../config/db';
import { Op } from 'sequelize';
import { Recipe } from '../models/recipe';
import { RecipeToIncredient } from '../models/recipeToIncredient';
import { Incredient } from '../models/incredient';
import { IngredientCategory, NewIngredient } from '../types';

export const getUsersRecipes = async (req: any, res: any) => {
  const { userId } = req.body;
  const recipes = await Recipe.findAll({
    where: {
      ownerId: userId
    }
  });
  res.send(recipes);
};

export const getRandomRecipes = async (req: any, res: any) => {
  const { limit, userId } = req.body;
  const recipes = await Recipe.findAll({
    limit: limit,
    where: {
      ownerId: {
        [Op.ne]: userId
      }
    },
    order: sequelize.random()
  });
  res.send(recipes);
};

export const addAllIncredients = async (recipe: any) => {
  await RecipeToIncredient.create({
    recipeId: recipe.id,
    incredientId: recipe.incredientId,
    amount: recipe.amount
  });
};


export const createRecipe = async (req: any, res: any) => {
  const { name, description, ownerId, global, incredients } = req.body;
  const transaction = await sequelize.transaction();

  const parseIncredient = (ingredient: unknown): NewIngredient => {
    if (
      typeof ingredient === 'object' &&
      ingredient !== null &&
      'name' in ingredient &&
      'ingredientCategory' in ingredient
    ) {
      const ing = ingredient as { name: unknown, ingredientCategory: unknown; };

      if (typeof ing.name !== 'string') {
        throw new Error('Invalid incredient name');
      }

      if (
        typeof ing.ingredientCategory === 'string' &&
        Object.values(IngredientCategory).includes(ing.ingredientCategory as IngredientCategory)
      ) {
        return ing as NewIngredient;
      }
    }

    throw new Error('Invalid incredient');
  };



  try {
    const recipe = await Recipe.create({
      name, description, ownerId, global
    }, { transaction });

    const incredientList = incredients.map((incredient: any) => { return { ...incredient, recipeId: recipe.id }; });

    await RecipeToIncredient.bulkCreate(
      {
        incredientList
      }, { transaction });


    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }

};