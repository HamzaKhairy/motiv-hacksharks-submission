const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your configured instance of Sequelize

const Post_Comment = sequelize.define('Post_Comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'post_comments',
    timestamps: true
});

module.exports = Post_Comment;
