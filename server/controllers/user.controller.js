const db = require('../services/db');
const { User } = require('../models/user.model.js');
const passport = require('../services/passport');
const argon2 = require('argon2');


const createUser = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const searchedUser = await User.findOne({
        where: {
          email: req.body.email
        },
    
      });
    
      if(searchedUser === null) {
        const hashedPassword =  await argon2.hash(req.body.password);
        res.status(200).send({ 
          message: 'User was created',
          name: req.body.name,
          email: req.body.email
        });
        return User.create({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          location: req.body.location
        })
      }
      else {
        res.status(400).send({ message: 'User already exists' });
      }
        
    } 
    catch (error) {
      console.log(error);  
    }
  
  });
    
};

const getAllUsers = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const users = await User.findAll();
      res.send(users);
      
    } 
    catch (error) {
      console.log(error);
      
    }

  });
  
  
}
const findUserById = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const user = await User.findByPk(req.body.id);
      if(user === null) {
        res.status(400).send({message: "User with the provided id does not exist" });
      }
      else {
        res.status(200).send({message: "User with the provided id was found", user: user.id});
      }
      
    } 
    catch (error) {
      console.log(error);
      
    }
  });
};

const deleteUserById = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const user = await User.findByPk(req.body.id);
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
      
    } 
    catch (error) {
      console.log(error);
      
    }

  });
};

const updateUserById = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const user = await User.findByPk(req.body.id);
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
      
    } 
    catch (error) {
      console.log(error);
      
    }
  });


  
  
};
module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  deleteUserById,
  updateUserById
}
