const express = require('express');
const passport = require('../services/passport');
const router = express.Router();
const db = require('../services/db.js');
const argon2 = require('argon2');
const { User } = require('../models/user.model.js');

router.post("/", async (req, res) => {
    db.sequelize.transaction(async () => {
      //
      
      const searchedUser = await User.findOne({
        where: {
          email: req.body.email
        },
        
  
      });
  
      if(searchedUser === null) {
        const hashedPassword =  await argon2.hash(req.body.password);
        return User.create({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          location: req.body.location
        })
      }
      else {
        console.log("User already exists")
      }
  
    })
    
  });

router.get('/signup', (req, res) => {
  res.send('signup')
});


module.exports = router;