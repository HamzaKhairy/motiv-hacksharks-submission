const { Sequelize, DataTypes } = require('sequelize'); 

const sequelize = require('../config/database'); // Import your configured instance of Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pfp: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  accountVisability: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING
  },
  studentCode: {
    type: DataTypes.STRING(6)
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
