import Sequelize from 'sequelize';
import init_models from "../models/init-models.js";
import dbConf from "./config.js";

export const sequelize = new Sequelize(dbConf.db.DB, dbConf.db.USER, dbConf.db.PASSWORD, {
    dialect: dbConf.db.dialect,
    host: dbConf.db.HOST,
    logging: dbConf.db.logging
});

export const models = init_models(sequelize);