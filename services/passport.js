const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const argon2 = require('argon2');
const { User } = require('../models/user.model.js');


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
      console.log("incorrect username or password")
      return done(null, false); 
    }

    if (!await argon2.verify(user.password, password)) {
      console.log("incorrect username or password");


      return done(null, false); 
    }
      
    console.log('Login information verified');
    // console.log(user.email);
    // console.log("user id: " + user.id);
    return done(null, user);
    
  }
  
));




passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      email: user.email,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;