const express = require('express');
const router = express.Router();
const db = require('../services/db.js');
const { User } = require('../models/user.model.js');

// Route for getting all users
router.get('/all', async (req, res) => {
    const users = await User.findAll();
    // console.log(users.every(user => user instanceof User)); // true
    // console.log("All users:", JSON.stringify(users, null, 2));  
    res.send(users);
    
});

// Route for finding a single user via id
router.get('/:id', async (req, res) => {
    // console.log('Request Id:', req.body.id);
    const user = await User.findByPk(req.body.id);
    // console.log(user instanceof User); // true
    if(user === null) {
        res.status(400).send({message: "User with the provided id does not exist" });
    }
    else {
        res.status(200).send({message: "User with the provided id was found", user: user.id});
    }
    
});
// Route for deleting a single user via id
router.delete('/:id', async (req, res) => {
    // console.log('Request Id to delete:', req.body.id);
    const user = await User.findByPk(req.body.id);
    // console.log(user instanceof User); // true
    if(user === null) {
        res.status(400).send({message: "User with the provided id does not exist" });
    }
    else {
        await User.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).send({message: "User with the provided id was deleted", user: user.id, name: user.name});
    }
    
});
// Route for updating a user's name via id
router.put('/:id', async (req, res) => {
    // console.log('Request Id to update:', req.body.id);
    // console.log('Name to update to:', req.body.id);
    const user = await User.findByPk(req.body.id);
    // console.log(user instanceof User); // true
    if(user === null) {
        res.status(400).send({message: "User with the provided id does not exist" });
    }
    else {
        await User.update({name: req.body.name}, {
            where: {
                id: user.id
            }
        })
        res.status(200).send({message: "User with the provided id was updated", user: user.id, name: user.name});
    }
    
});

module.exports = router;