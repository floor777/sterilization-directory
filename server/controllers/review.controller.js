const { Review } = require('../models/review.model.js');
const db = require('../services/db');

const getAllReviews = async (req, res) => {
    db.sequelize.transaction(async () => {
        try {
            const reviews = await Review.findAll();
            res.send(reviews);  
        } 
        catch (error) {
            console.log(error);
            
        } 

    });
    
};

const getReviewsByMarkerId = async(req, res) => {
    db.sequelize.transaction(async () => {
        try {
            const searchedReviews = await Review.findAll({
                where: {
                    markerId: req.query.markerId
                }
            });
            res.send(searchedReviews);
            
        } 
        catch (error) {
            console.log(error);
        }

    });

};

const createReview = async (req, res) => {
    db.sequelize.transaction(async () => {
        try {
            await Review.create({
                message: 'Review was created',
                sex: req.body.sex,
                maritalStatus: req.body.maritalStatus,
                type: req.body.type,
                reviewText: req.body.reviewText,
                userId: req.body.userId,
                markerId: req.body.markerId
            });
    
            res.status(200).send({ 
                message: 'Review was created',
                sex: req.body.sex,
                maritalStatus: req.body.maritalStatus,
                type: req.body.type,
                reviewText: req.body.reviewText,
                userId: req.body.userId,
                markerId: req.body.markerId
            });
            
        } 
        catch (error) {
            console.log(error);
            
        }
    });
};

const deleteReview = (req, res) => {
    db.sequelize.transaction(async () => {
        try {
            await Review.destroy({
                where: {
                    reviewId: req.query.reviewId
                }
            })
            res.status(200).send({message: 'Review was destroyed'});
            
        } 
        catch (error) {
            console.log(error);
        }
        
    });

    
};

const updateReview = async (req, res) => {
    db.sequelize.transaction(async () => {
        try {
            const searchedReview = await Review.findOne({
                where: {
                    reviewId: req.query.reviewId
                }
            });
            searchedReview.set({
                sex: req.query.sex,
                maritalStatus: req.query.maritalStatus,
                type: req.query.type,
                reviewText: req.query.reviewText
            });
            await searchedReview.save();
            res.send(searchedReview);
        }
        catch (error) {
            console.log(error);
            
        }
        
    });
};

const findReviewById = async (req, res) => {
    db.sequelize.transaction(async () => {
        try {
            const searchedReview = await Review.findOne({
                where: {
                    reviewId: req.query.reviewId
                }
            });
            
            res.send({review: searchedReview});
            
        } 
        catch (error) {
            console.log(error);
        }
    });
};




module.exports = {
    getAllReviews,
    getReviewsByMarkerId,
    createReview,
    deleteReview,
    updateReview,
    findReviewById
};