const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class EventAttendee extends Model {}

EventAttendee.init({
    attendee_id: {
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'EventAttendee',
    timestamps: false,
    tableName: 'event_attendees'
});

module.exports = EventAttendee;
