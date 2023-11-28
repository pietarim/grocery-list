import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { Recipe, Item, User } from '../models';

export const getRandomRecipes = async () => {
  const randomNames = await Recipe.findAll({
    attributes: ['name'],
    order: sequelize.random(),
    limit: 5
  });
  const nameArr = randomNames.map((name: any) => name.name);
  return await Recipe.findAll({
    where: {
      name: nameArr
    },
    attributes: [
      'id',
      'name',
      'description',
      'imageUri',
      [Sequelize.fn('COUNT', Sequelize.col('liked.id')), 'like_count']
    ],
    include: [
      {
        model: Item,
        as: 'item',
        attributes: ['id', 'name', 'unitSize', 'type'],
        through: {
          attributes: ['amount']
        }
      },
      {
        model: User,
        as: 'liked',
        attributes: [],
        through: {
          attributes: [],
        }
      }
    ],
    group: ['recipe.id', 'item.id', 'item->recipeToItem.id'],
    order: sequelize.random()
  });
};

export const getMostLikedRecipes = async () => {
  const randomNames = await Recipe.findAll({
    order: [['liked', 'DESC']],
    attributes: ['name'],
    limit: 10
  });
  const nameArr = randomNames.map((name: any) => name.name);
  return await Recipe.findAll({
    where: {
      name: nameArr
    },
    attributes: [
      'id',
      'name',
      'description',
      'imageUri',
      [Sequelize.fn('COUNT', Sequelize.col('liked.id')), 'like_count']
    ],
    include: [
      {
        model: Item,
        as: 'item',
        attributes: ['id', 'name', 'unitSize', 'type'],
        through: {
          attributes: ['amount']
        }
      },
      {
        model: User,
        as: 'liked',
        attributes: [],
        through: {
          attributes: [],
        }
      }
    ],
    group: ['recipe.id', 'item.id', 'item->recipeToItem.id'],
  });
};

export const getUsersRecipes = async (userId: number) => {
  return await Recipe.findAll({
    where: {
      ownerId: userId
    }
  });
};