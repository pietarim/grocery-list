const port: string = process.env.PORT || '3001';
const databaseUrl: string = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

const config = {
  development: {
    port,
    databaseUrl
  }
};

export default config;