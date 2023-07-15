const express = require('express');
const { Review } = require('../models/review.model.js');
const db = require('../services/db');
const router = express.Router();
const reviewController = require('../controllers/review.controller.js')

router.get('/all', reviewController.getAllReviews);

router.get('/getReviewsByMarkerId', reviewController.getReviewsByMarkerId);



router.post('/create', reviewController.createReview);

router.delete('/delete', reviewController.deleteReview);

router.put('/update', reviewController.updateReview);

router.get('/findareview', reviewController.findReviewById);

module.exports = router;