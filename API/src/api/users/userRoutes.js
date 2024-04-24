/**
 * Express router for user routes.
 * @module userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('./userController');

/**
 * Route for getting all users.
 * @name GET /api/users
 * @function
 */
router.get('/', userController.getAllUsers);

/**
 * Route for getting a user by ID.
 * @name GET /api/users/:id
 * @function
 * @param {string} id - The ID of the user.
 */
router.get('/:id', userController.getUserById);

/**
 * Route for creating a new user.
 * @name POST /api/users
 * @function
 */
router.post('/', userController.createUser);

/**
 * Route for updating a user by ID.
 * @name PUT /api/users/:id
 * @function
 * @param {string} id - The ID of the user.
 */
router.put('/:id', userController.updateUser);

router.get('/:id/schools', userController.getSchoolsByUser);

router.get('/:id/conversations', userController.getConversationsByUser);

module.exports = router;
