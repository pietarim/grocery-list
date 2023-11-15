import express from 'express';
import config from './config/config';
import userRouter from './routes/users';
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

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
