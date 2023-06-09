const express = require('express');
const passport = require('../services/passport');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router;