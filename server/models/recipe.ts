import { Model, DataTypes, Sequelize, QueryTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Recipe extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public ownerId!: number;
  public global!: boolean;
}
Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
  },
  global: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'recipe',
}
);

export { Recipe };