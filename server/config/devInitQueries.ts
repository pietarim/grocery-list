import { Sequelize } from 'sequelize';
import { Model, DataTypes } from "sequelize";
import { User, Recipe, RecipeToIncredient, Item } from "../models/index";
import { Umzug, SequelizeStorage } from 'umzug';

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/postgres'); //5432

const connectToDatabase = async () => {
  console.log('connecting to the database connecting to the database connecting to the database connecting to the database ');
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('3333333');
    console.log('connected to the database connected to the database connected to the database connected to the database ');
  } catch (err) {
    console.log('err err err err err err');
    console.log(err);
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

const migrationConf = {
  migrations: {
    glob: 'migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  console.log('11111');
  const migrator = new Umzug(migrationConf);
  console.log('22222');
  const migrations = await migrator.up();
  console.log('33333');
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

connectToDatabase();

const main = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
const init = async () => {
  console.log('1111111');
  const user = await User.create({
    username: "test",
    email: "user@gmail.com",
    passwordHash: "password",
    isAdmin: false,
  });
  console.log('2222222');
  const user1 = await User.create({
    username: "test1",
    email: "user1@gmail.com",
    passwordHash: "password",
    isAdmin: false,
  });
  console.log('3333333');
  const fish = await Item.create({
    name: "muikut öljyssä",
    type: "fish",
    unitSize: 0.15,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 13.27,
  });
  console.log('4444444');
  const oat = await Item.create({
    name: "kaurahiutale",
    type: "other",
    unitSize: 1,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 1.99,
  });

  console.log('5555555');
  const butter = await Item.create({
    name: "voi",
    type: "other",
    unitSize: 0.25,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 7.96,
  });

  console.log('6666666');
  const korppujauho = await Item.create({
    name: "korppujauho",
    type: "other",
    unitSize: 0.4,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 7.98,
  });

  console.log('7777777');
  const recipe = await Recipe.create({
    name: "muikut",
    description: "muikut",
    ownerId: user.id,
    global: false,
  });

  await RecipeToIncredient.create({
    recipeId: recipe.id,
    ingredientId: fish.id,
    ammount: 1,
  });

  await RecipeToIncredient.create({
    recipeId: recipe.id,
    ingredientId: korppujauho.id,
    ammount: 0.1,
  });

  await RecipeToIncredient.create({
    recipeId: recipe.id,
    ingredientId: butter.id,
    ammount: 0.1,
  });
};

/* init(); */