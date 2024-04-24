const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your configured instance of Sequelize

const User = require('./userModel');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'posts',
    timestamps: true
});

module.exports = Post;
