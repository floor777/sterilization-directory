const express = require('express');
const router = express.Router();
const passport = require('../services/passport');


router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
      

    // NEED TO CALL req.login()!!!
    req.login(user, next);
    console.log("current req.user: " + req.user.email);
    console.log(req.session.id);
  })(req, res, next);

  
}
);


router.get('/', (req, res) => {
    console.log('get in login testing');
})

module.exports = router;