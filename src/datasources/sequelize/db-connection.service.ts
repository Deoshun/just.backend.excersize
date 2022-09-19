import { Sequelize } from 'sequelize';

const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true
    }
  }
);

export default sequelize;
