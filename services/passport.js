const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const argon2 = require('argon2');
const { User } = require('../models/user.model.js');
const db = require('./db.js');
const { error } = require('console');


passport.use(new LocalStrategy( 
  {usernameField: "email"},
  async function verify(email, password, done) {
    console.log('in verify');
    let user = await User.findOne(
      { 
        where: {
          email: email 
        },  
      }
    );
    if (!user) {
      console.log("incorrect username or password X")
      return done(null, false); 
    }

    if (!await argon2.verify(user.password, password)) {
      console.log("incorrect username or password Y");


      return done(null, false); 
    }
      
    console.log('Login information verified');
    // console.log(user.email);
    // console.log("user id: " + user.id);
    return done(null, user);
    
  }
  
));




passport.serializeUser(function(user, cb) {
  console.log("serialize user called");
  console.log("user to serialize: " + user.email)
  process.nextTick(function() {
    return cb(null, user.id);
  });
  console.log('end of serialize')
  
  
});

passport.deserializeUser(async function(userid, cb) {
  console.log('deserialize user called');

 

  let user = await User.findOne(
    { 
      where: {
        id: userid
      },  
    }
    
  );
  console.log(user.email)
  
  process.nextTick(function() {
    return cb(null, user);
  });
  console.log('end of deserialize')
  
});

module.exports = passport;