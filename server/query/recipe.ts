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
  console.log('???????????????????????????????????????????');
  console.log(nameArr);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
    group: ['recipe.id', 'item.id', 'item->recipeToItem.id'],
    /* limit: 10,
    subQuery: false, */
    order: sequelize.random() /* [['name', 'DESC']], */
    /* order: [['recipe.id', 'DESC']],
    limit: 5, */
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