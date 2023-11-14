import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class RecipeToIncredient extends Model { }
RecipeToIncredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes',
      key: 'id'
    },
  },
  incredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'incredients',
      key: 'id'
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'recipeToIncredient',
});

export { RecipeToIncredient };