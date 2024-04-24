/**
 * Express router for conversation routes.
 * @module conversationRoutes
 */

const express = require('express');
const router = express.Router();
const conversationController = require('./conversationController');

router.get('/', conversationController.getAllConversations);

/**
 * Route for creating a conversation.
 * @name POST /api/conversations
 * @function
 * @memberof module:conversationRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The created conversation
 */
router.post('/', conversationController.createConversation);

/**
 * Route for getting a conversation by ID.
 * @name GET /api/conversations/:id
 * @function
 * @memberof module:conversationRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The conversation with the specified ID
 */
router.get('/:id', conversationController.getConversationById);

router.put('/:id/users', conversationController.addUserToConversation);

router.get('/:id/messages', conversationController.getMessagesByConversation);
router.post('/:id/messages', conversationController.createMessage);

module.exports = router;
