/* const { DATABASE_URL } = require('./config'); */
import config from '../config/config';
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

console.log('anything');

const sequelize = new Sequelize(config.development.databaseUrl);

console.log('another one');

const migrationConf = {
  migrations: {
    glob: 'migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

console.log('HOLAA');

const rollbackMigration = async () => {
  console.log('rollbackMigration 1111');
  await sequelize.authenticate();
  console.log('rollbackMigration 2222');
  const migrator = new Umzug(migrationConf);
  console.log('rollbackMigration 3333');
  await migrator.down();
  console.log('rollbackMigration 4444');
};

rollbackMigration();