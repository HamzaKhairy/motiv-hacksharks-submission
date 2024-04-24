const { User, School, Conversation } = require('../../models/associations');

function generateCode(length = 6) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
  
    return code;
  }

/**
 * Controller for handling user-related operations.
 * @namespace userController
 */
const userController = {
    async createUser(req, res) {
        try {
            req.body.id = req.body.user_id
            req.body.username = req.body.username ?? req.body.email ?? "No username"
            req.body.firstName = req.body.given_name ?? "No name"
            req.body.lastName = req.body.family_name ?? "No name"
            req.body.studentCode = generateCode()
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getAllUsers(req, res) {
        console.log(generateCode())
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async updateUser(req, res) {
        console.log(req.body)
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                await user.update(req.body);
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getSchoolsByUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: School,
                    as: 'schools',
                    attributes: { exclude: ['user_school_inter'] },
                    through: {
                        attributes: []
                    }
                }]
            });
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user.schools);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getConversationsByUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: Conversation,
                    as: 'conversations',
                    attributes: { exclude: ['user_conversation_inter'] },
                    through: {
                        attributes: []
                    },
                    include: [{
                        model: User,
                        as: 'users',
                        attributes: ['id'],
                        through: {
                            attributes: [],
                        }
                    }]
                }]
            });
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user.conversations);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

module.exports = userController;
