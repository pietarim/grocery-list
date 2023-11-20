import { Sequelize } from 'sequelize';
import { Recipe, Item, User } from '../models';

export const getRandomRecipes = async () => {
  return await Recipe.findAll({
    attributes: [
      'name',
      [Sequelize.fn('COUNT', Sequelize.col('liked.id')), 'like_count']
    ],
    include: [
      {
        model: Item,
        as: 'item',
        attributes: ['id', 'name', 'unitSize'],
        through: {
          attributes: ['ammount']
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
    group: ['recipe.id', 'item.id', 'item->recipeToItem.id']
  });
};
/* ,
{
model: User,
as: 'liked',
attributes: ['id'],
through: {
attributes: ['userId', 'recipeId'],
}
} */
/* ], */
/* where: { TODO this will be needed later
  ownerId: {
    [Op.ne]: userId
  }
}, */
/* order: sequelize.random()
  });
}; */

export const getUsersRecipes = async (userId: number) => {
  return await Recipe.findAll({
    where: {
      ownerId: userId
    }
  });
};