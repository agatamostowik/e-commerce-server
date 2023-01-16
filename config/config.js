const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
