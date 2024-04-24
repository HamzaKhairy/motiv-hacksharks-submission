const uuid = require('uuid');
const { Conversation, User, Message } = require('../../models/associations');

const conversationController = {
    async getAllConversations(req, res) {
        try {
            const conversations = await Conversation.findAll();
            res.status(200).json(conversations);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    /**
     * Creates a new conversation.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the conversation is created.
     */
    async createConversation(req, res) {
        try {
            req.body.id = uuid.v4();
            const newConversation = await Conversation.create(req.body);
            res.status(201).json(newConversation);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Retrieves a conversation by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async getConversationById(req, res) {
        try {
            const conversation = await Conversation.findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'users',
                    attributes: ['id'],
                    through: {
                        attributes: [],
                    },
                }],
            });
    
            if (!conversation) {
                res.status(404).send('Conversation not found');
            } else {
                res.status(200).json(conversation);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async addUserToConversation(req, res) {
        try {
            const conversation = await Conversation.findByPk(req.params.id);
            if (!conversation) {
                res.status(404).send('Conversation not found');
            } else {
                const user = await User.findByPk(req.body.userId);
                if (!user) {
                    res.status(404).send('User not found');
                } else {
                    await conversation.addUser(user);
                    res.status(200).json(conversation);
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getMessagesByConversation(req, res) {
        try {
            const conversation = await Conversation.findByPk(req.params.id, {
                include: [{
                    model: Message,
                    as: 'messages',
                    attributes: { exclude: ['conversationId'] },
                }],
            });

            if (!conversation) {
                res.status(404).send('Conversation not found');
            } else {
                res.status(200).json(conversation.messages);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async createMessage(req, res) {
        try {
            req.body.id = uuid.v4();
            req.body.conversationId = req.params.id;
            const newMessage = await Message.create(req.body);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

};

module.exports = conversationController;
