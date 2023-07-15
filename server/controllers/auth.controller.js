const passport = require('../services/passport');

const logout = function(req, res, next){
    req.logout(function(err) {
      if (err) {
         return next(err); 
      }
      res.sendStatus(200);
    });
}

const login = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true })(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.isAuthenticated()) {
        res.status(200).send({
          message: "Login was successful"
        });
      } else {
        res.sendStatus(404);
      }
    });
};

const isAuthenticated = (req, res) => {
  res.send(req.isAuthenticated());
};

const currentUser = (req, res) => {
  if(req.isAuthenticated) {
      res.send(req.user.id);
  }
  else {
      res.send('Not signed in sorry');
  }

};

module.exports = {
    logout,
    login,
    isAuthenticated,
    currentUser
  
};