import { Sequelize, Dialect } from 'sequelize';

if (!process.env.RDB_DATABASE) {
    throw new Error('No RDB_DATABASE');
}
if (!process.env.RDB_USER) {
    throw new Error('No RDB_USER');
}

const sequelize = new Sequelize(
  process.env.RDB_DATABASE,
  process.env.RDB_USER,
  process.env.RDB_PASSWORD,
  {
    host: process.env.RDB_HOST,
    port: parseInt(process.env.RDB_PORT || "3000"),
    dialect: process.env.RDB_DIALECT as Dialect
  }
);

export { sequelize };
