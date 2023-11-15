import { Model, DataTypes, Sequelize, QueryTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Like extends Model { }
Like.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes',
      key: 'id'
    },
  },
}, {
  sequelize,
  modelName: 'like',
}
);

export { Like };
