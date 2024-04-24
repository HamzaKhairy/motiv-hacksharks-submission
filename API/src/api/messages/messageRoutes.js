const express = require('express');
const router = express.Router();
const userController = require('./userController');

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a single user by id
router.get('/:id', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update a user by id
router.put('/:id', userController.updateUser);

// Route to delete a user by id
// router.delete('/:id', userController.deleteUser);

module.exports = router;
