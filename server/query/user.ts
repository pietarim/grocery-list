import { sequelize } from '../../config/db';

import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export const getUser = async (id: number) => {
  const user = await User.findByPk(id);
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ where: { username: username } });
  return user;
};