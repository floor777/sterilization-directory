const express = require('express');
const { Marker } = require('../models/marker.model');
const db = require('../services/db');
const router = express.Router();

// Get all markers in the markers table
router.get('/all', async (req, res) => {
    const markers = await Marker.findAll();
    res.send(markers);
});
// Check if a marker exists in the database already
router.get('/exists', async( req, res) => {
  let fixedLat = Number(req.query.lat).toFixed(6);
  let fixedLng = Number(req.query.lng).toFixed(6);

  const marker = await Marker.findOne({
    where: {
      lat: fixedLat,
      lng: fixedLng
    },

  });

  if(marker === null) {


    res.status(200).send({ 
      message: 'Marker at this lat/lng does not exist yet'
    });
  

  }
  else {

    res.status(200).send({
      message: 'Marker at this lat/lng already exists',
      marker: marker
    });
 
  }
})

// Build a new marker and save it in teh database
router.post('/build', async (req, res) => {
  let fixedLat = Number(req.query.lat).toFixed(6);
  let fixedLng = Number(req.query.lng).toFixed(6);

  try {
    let response = await Marker.create({
      lat: fixedLat,
      lng: fixedLng,
      title: req.query.title
    });

    res.send({marker: response})
    
  } 
  catch (error) {
    console.log(error)
    
  }
  
})
module.exports = router;