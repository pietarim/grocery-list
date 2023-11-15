import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface RecipeToIncredientAttributes {
  id: number;
  recipeId: number;
  ingredientId: number;
  ammount: number;
}

type RecipeToIncredientCreationAttributes = Optional<RecipeToIncredientAttributes, 'id'>;

class RecipeToIncredient extends Model<RecipeToIncredientAttributes, RecipeToIncredientCreationAttributes> {
  declare id: number;
  declare recipeId: number;
  declare ingredientId: number;
  declare ammount: number;
}
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
  ingredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'incredients',
      key: 'id'
    },
  },
  ammount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'recipeToIncredient',
});

export { RecipeToIncredient };