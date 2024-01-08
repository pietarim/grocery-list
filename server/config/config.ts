const environment: string = process.env.NODE_ENV || 'dev';

const port: string = process.env.PORT || '3001';
const databaseUrlDevelopment: string = process.env.DATABASE_URL || 'postgres://postgres:mysecretpassword@localhost:5432/postgres';
const databaseUrlProduction: string = process.env.DATABASE_URL_PRODUCTION || 'postgres://postgres:mysecretpassword@localhost:5432/postgres';

const databaseUrl = environment === 'production' ? databaseUrlProduction : databaseUrlDevelopment;
const url = process.env.URL_PRODUCTION || 'http://localhost:3000';

const config = {
  port,
  databaseUrl,
  url
};

export default config;