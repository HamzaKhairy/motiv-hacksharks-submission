const UserModel = require('../../models/userModel');
const UserService = require('../../services/userService');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await UserService.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get a single user by ID
    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = await UserService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.update(req.params.id, req.body);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const success = await UserService.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = userController;
