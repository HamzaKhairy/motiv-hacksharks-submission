const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

// Database configuration
const databaseConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: fs.readFileSync('src/config/ca.crt').toString(),
    },
  },
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
    logging: false, // Disable logging; set to console.log for seeing SQL queries
    pool: {
      max: 5, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
    },
    dialectOptions: databaseConfig.dialectOptions, // Comment this line for localhost db
  }
);

// Testing the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Exporting the sequelize instance
module.exports = sequelize;
