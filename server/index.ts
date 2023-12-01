require('express-async-errors');
import dotenv from 'dotenv';
import express from 'express';
import config from './config/config';
import { userRouter, recipeRouter, itemRouter, imageRouter, authRouter } from './routes';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

const { Model, DataTypes, Sequelize, QueryTypes } = require('sequelize');

dotenv.config();
const app = express();
const port = 3001;

console.log(config.development.port);

const sequelize = new Sequelize(config.development.databaseUrl, {
  /* const main = async () => {
    try {
      await 
    }
  } */
});

const main = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();

app.use(cors());
app.use(express.json());
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/images', imageRouter);
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/items', itemRouter);
app.use('/api/recipeLikes', recipeRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
