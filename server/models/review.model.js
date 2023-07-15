const {Sequelize, DataTypes} = require("sequelize");
const db = require('../services/db.js');
const { Marker } = require("./marker.model.js");




const Review = db.sequelize.define('reviews', {
    reviewId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    sex: {
        type: DataTypes.CHAR,
        allowNull: false,

    },
    maritalStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    markerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }




    
});



db.sequelize.sync().then(() => {
    console.log('Review table created successfully');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});




module.exports = {
    Review: Review
}