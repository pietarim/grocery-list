import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { IngredientCategory } from '../types';

class Ingredient extends Model { // TODO prety sure this is not needed
  public id!: number;
  public name!: string;
  public type!: string;
}
Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredientCategory: {
    type: DataTypes.ENUM,
    values: Object.values(IngredientCategory),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'incredient',
});

export { Ingredient };