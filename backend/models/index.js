const initModels = require('./init-models');
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = initModels(sequelize);
models.sequelize = sequelize;

module.exports = models;