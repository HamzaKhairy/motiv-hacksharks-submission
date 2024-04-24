const { Sequelize, DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'conversations',
      key: 'id',
    },
  },
}, {
  tableName: 'messages',
  timestamps: true
});

module.exports = Message;
