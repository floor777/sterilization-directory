const express = require('express');
const router = express.Router();
const passport = require('../services/passport');


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    // console.log("req.user.email: " + req.user);
    // console.log(req.isAuthenticated());
    // console.log(req.session)
    if(req.isAuthenticated) {
      res.sendStatus(200)
    }
    else {
      res.sendStatus(404)
    }
  });


router.get('/', (req, res) => {
    res.send('login get route');
})

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) {
       return next(err); 
    }
    res.sendStatus(200);
  });
});

module.exports = router;