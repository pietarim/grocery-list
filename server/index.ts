require('express-async-errors');
import express from 'express';
import config from './config/config';
import { userRouter, recipeRouter, itemRouter, imageRouter } from './routes';
import cors from 'cors';
/* import userRouter from './routes/user';
import recipeRouter from './routes/recipe';
import itemRouter from './routes/item'; */
const { Model, DataTypes, Sequelize, QueryTypes } = require('sequelize');

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
