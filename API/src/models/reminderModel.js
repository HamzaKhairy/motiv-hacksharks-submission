const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Reminder extends Model {}

Reminder.init({
    reminder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'events',
            key: 'event_id'
        }
    },
    reminder_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Reminder',
    timestamps: true,
    tableName: 'reminders'
});

module.exports = Reminder;
