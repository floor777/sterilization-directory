const express = require('express');
const passport = require('../services/passport');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/isauthenticated', (req, res) => {

  res.send(req.isAuthenticated());
 
    
});

router.get('/currentuser', (req, res) => {
  if(req.isAuthenticated) {
    res.send(req.user.id);
  }
  else {
    res.send('Not signed in sorry');
  }
  });

module.exports = router;