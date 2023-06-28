const express = require('express');
const { Marker } = require('../models/marker.model');
const db = require('../services/db');
const router = express.Router();



// Get all markers in the markers table
router.get('/all', async (req, res) => {
    const markers = await Marker.findAll();
    console.log(markers.every(marker => marker instanceof Marker)); // true
    console.log('All markers:', JSON.stringify(markers, null, 2));  
    res.send(markers);
    

});

router.post('/', async (req, res) => {
    db.sequelize.transaction(async () => {
        
        const searchedMarker = await Marker.findOne({
          where: {
            lat: req.query.lat,
            lng: req.query.lng
          },
          
    
        });
    
        if(searchedMarker === null) {
          res.status(200).send({ 
            message: 'Marker was created',

            lat: req.query.lat,
            lng: req.query.lng,
            title: req.query.title
          });
          return Marker.create({
            lat: req.query.lat,
            lng: req.query.lng,
            title: req.query.title
          })
        }
        else {
          res.status(400).send({ message: 'Marker already exists at that position' });
        }
    
      })
});
module.exports = router;