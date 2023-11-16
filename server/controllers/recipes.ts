import { sequelize } from '../config/db';
import { Op } from 'sequelize';
import { Recipe } from '../models/recipe';
import { RecipeToItem } from '../models/recipeToItem';
import { Item } from '../models/';
import { ItemCategory, NewItem, NewRecipeToItem } from '../types';
import { parseIncredient, parseString, parseDescription, parseOwnerId, parseGlobal } from '../config/utils';

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
  /* const { limit, userId } = req.body; */
  const recipes = await Recipe.findAll({
    limit: 5,
    include: [{
      model: Item,
      as: 'item',
      through: {
        attributes: ['ammount', 'id']
      }
    },
    ],
    /* where: { TODO this will be needed later
      ownerId: {
        [Op.ne]: userId
      }
    }, */
    order: sequelize.random()
  });
  res.send(recipes);
};

/* export const addAllIncredients = async (recipe: any) => {
  await RecipeToItem.create({
    recipeId: recipe.id,
    incredientId: recipe.incredientId,
    amount: recipe.amount
  });
}; */


export const createRecipe = async (req: any, res: any) => {
  const { name, description, ownerId, global, incredients } = req.body;
  const transaction = await sequelize.transaction();

  const parsedIncredients: NewItem[] = incredients.map((incredient: any) => {
    return parseIncredient(incredient);
  });

  const parsedName = parseString(name);
  const parsedDescription = parseDescription(description);
  const parsedOwnerId = parseOwnerId(ownerId);
  const parsedGlobal = parseGlobal(global);

  try {
    const recipe = await Recipe.create({
      parsedName, parsedDescription, parsedOwnerId, parsedGlobal
    }, { transaction });

    const itemList: NewRecipeToItem[] = parsedIncredients.map(
      (item: NewItem) => {
        return {
          itemId: item.id, ammount: item.ammount, recipeId: recipe.id
        };
      });

    await RecipeToItem.bulkCreate(itemList, { transaction });

    await transaction.commit();
    res.status(201).send('Recipe created');

  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(500).send('Something went wrong');
  }
};