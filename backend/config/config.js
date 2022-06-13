require('dotenv').config();

module.exports = {
  "development": {
    "username": "damosa",
    "password": process.env.DB_PASSWORD,
    "database": "test",
    "host": "203.249.22.52",
    "dialect": "mysql",
    "port" : process.env.DB_PORT,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "damosa",
    "password": process.env.DB_PASSWORD,
    "database": "test",
    "host": "203.249.22.52",
    "dialect": "mysql",
    "port" : process.env.DB_PORT,
  }
}
