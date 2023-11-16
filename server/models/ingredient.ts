import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { ItemCategory } from '../types';

class Item extends Model { // TODO prety sure this is not needed
  public id!: number;
  public name!: string;
  public type!: string;
}
Item.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  itemCategory: {
    type: DataTypes.ENUM,
    values: Object.values(ItemCategory),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'incredient',
});

export { Item };