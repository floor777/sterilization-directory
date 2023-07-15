const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/isauthenticated', authController.isAuthenticated);
router.get('/currentuser', authController.currentUser);

module.exports = router;