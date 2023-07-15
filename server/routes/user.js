const express = require('express');
const router = express.Router();
const db = require('../services/db.js');
const { User } = require('../models/user.model.js');
const userController = require('../controllers/user.controller.js');

// Route for getting all users
router.get('/all', userController.getAllUsers);

//Route for creating a new user
router.post('/createuser', userController.createUser);

// Route for finding a single user via id
router.get('/:id', userController.findUserById);

// Route for deleting a single user via id
router.delete('/:id', userController.deleteUserById);

// Route for updating a user's name via id
router.put('/:id', userController.updateUserById);

module.exports = router;