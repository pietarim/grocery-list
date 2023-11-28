import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from '../models/user';
import { User as UserType } from '../types';

export const getUsers = async () => {
  const users = await User.findOne({
    where: { id: 1 },
    include: [
      {
        model: User,
        as: 'friends',
        attributes: ['id', 'username'],
        through: {
          attributes: [],
        },
      }
    ],
    attributes: ['id', 'username']
  });
  return users;
};

export const getUser = async (id: number) => {
  const user = await User.findByPk(id);
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ where: { username: username } });
  return user;
};

export const createUser = async (user: UserType) => {
  const savedUser = await User.create(user);
  return savedUser;
};

export const updateUser = async (user: User, id: number) => {
  await User.update(user, {
    where: {
      id,
    },
  });
};

export const deleteUser = async (id: number) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

