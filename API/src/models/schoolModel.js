const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const School = sequelize.define('School', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'schools',
    timestamps: true
});

module.exports = School;
