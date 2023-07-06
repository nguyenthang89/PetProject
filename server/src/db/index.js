import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { Sequelize } from "sequelize";
import { isDevelopmentMode } from "../utilities/env";

export const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: isDevelopmentMode,
  host: process.env.APP_DB_HOST,
  port: process.env.APP_DB_PORT,
  database: process.env.APP_DB_NAME,
  username: process.env.APP_DB_AUTH_USER,
  password: process.env.APP_DB_AUTH_PASSWORD,
  timezone: process.env.APP_TIMEZONE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  retry: { max: 3 },
  schema: process.env.APP_DB_SCHEMA
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connect to database successful!');

    const containerPath = path.resolve(process.cwd(), 'src', 'db', 'models');
    const models = fs.readdirSync(containerPath);
    Promise.all(
      models
        .filter(file => _.endsWith(file, '.js'))
        .map(file => import(path.resolve(containerPath, file)))
    ).then(() => sequelize.sync({ alter: true }));
  } catch (err) {
    console.error('Failed to configure database connection!', err);
  }
})();