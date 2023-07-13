const {Sequelize, DataTypes} = require("sequelize");
const db = require('../services/db.js');
const { Review } = require("./review.model.js");


const Marker = db.sequelize.define('markers', {
    id: {
        type: DataTypes.INTEGER,
        initialAutoIncrement: 1,
        autoIncrement: true,
        primaryKey: true
    },
    lat: {
        type: DataTypes.DECIMAL(10,6),
        allowNull: false
    },
    lng: {
        type: DataTypes.DECIMAL(10,6),
        allowNull: false

    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    
});
Marker.hasMany(Review);
Review.belongsTo(Marker);

db.sequelize.sync().then(() => {
    console.log('Markers table created successfully');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


module.exports = {
    Marker: Marker
  }