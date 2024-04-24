const sequelize = require('../config/database'); // Your Sequelize instance
const User = require('./userModel');
const Event = require('./eventModel');
const Conversation = require('./conversationModel');
const Message = require('./messageModel');
const School = require('./schoolModel');
const Team = require('./teamModel');
const Post = require('./postModel');
const Post_Comment = require('./post_commentModel');

// Post Ownership (O->M)
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Post likes (M->M)
User.belongsToMany(Post, { through: 'user_post_likes' });
Post.belongsToMany(User, { through: 'user_post_likes' });

// Post Comments (M->O)
Post.hasMany(Post_Comment, {
  foreignKey: 'postId',
  as: 'comments',
});

// School Students (M->M)
User.belongsToMany(School, {
  through: 'user_school_inter',
  foreignKey: 'userId',
  as: 'schools',
});
School.belongsToMany(User, {
  through: 'user_school_inter',
  foreignKey: 'schoolId',
  as: 'students',
});

// School Teams (M->M)
School.belongsToMany(Team, {
  through: 'school_teams_inter',
  foreignKey: 'schoolId',
  as: 'teams',
});

Team.belongsToMany(School, {
  through: 'school_teams_inter',
  foreignKey: 'teamId',
  as: 'schools',
});

// Students on Teams (M->M)
User.belongsToMany(Team, {
  through: 'user_teams_inter',
  foreignKey: 'userId',
  as: 'teams'
});
Team.belongsToMany(User, {
  through: 'user_teams_inter',
  foreignKey: 'teamId',
  as: 'students'
});

// Messages in a Conversation (M->O)
Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
  as: 'messages',
});

// Messages from a User (M->O)
User.hasMany(Message, {
  foreignKey: 'userId',
  as: 'messages',
});

// Define the relationships
User.belongsToMany(Conversation, {
  through: 'user_conversation_inter',
  foreignKey: 'userId',
  as: 'conversations'
});
Conversation.belongsToMany(User, {
  through: 'user_conversation_inter',
  foreignKey: 'conversationId',
  as: 'users'
});

// Team has one Conversation
Team.belongsTo(Conversation, {
  foreignKey: 'conversationId',
  as: 'conversation'
});

// Conversation belongs to one Team
Conversation.hasOne(Team, {
  foreignKey: 'conversationId',
  as: 'team'
});

sequelize.sync({ alter: true });

module.exports = {
  User,
  Event,
  Conversation,
  Message,
  School,
  Team,
  Post,
  Post_Comment,
};
