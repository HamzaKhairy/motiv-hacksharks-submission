const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'teams',
    timestamps: true
});

module.exports = Team;
