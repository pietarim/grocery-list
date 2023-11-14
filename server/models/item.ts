import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import e from 'express';

class Item extends Model { }
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
  incredientType: {
    type: DataTypes.ENUM,
    values: [
      'meat', 'vegetable', 'spice', 'other', 'rice',
      'premade', 'frozen_premade', 'candy', 'sauce',
      'fish', 'seafood', 'dairy', 'fruit', 'baking',
      'other'
    ],
    allowNull: false
  },
  unitSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.INTEGER
  },
  pricePerUnit: {
    type: DataTypes.INTEGER
  },

}, {
  sequelize,
  modelName: 'item',
});

export { Item };