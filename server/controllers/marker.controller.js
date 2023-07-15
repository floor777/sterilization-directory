const { Marker } = require('../models/marker.model');
const db = require('../services/db');




const getAllMarkers = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      const markers = await Marker.findAll();
      res.send(markers);
      
    } 
    catch (error) {
      console.log(error);
      
    }

  });

  
    
};

const exists = async( req, res) => {
  db.sequelize.transaction(async () => {
    try {
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
     
      };
      
    } 
    catch (error) {
      console.log(error);
      
    }

  })
  
  
    
};

const build = async (req, res) => {
  db.sequelize.transaction(async () => {
    try {
      let fixedLat = Number(req.query.lat).toFixed(6);
      let fixedLng = Number(req.query.lng).toFixed(6);
      let response = await Marker.create({
        lat: fixedLat,
        lng: fixedLng,
        title: req.query.title
    });
  
    res.send({marker: response});
      
    } 
    catch (error) {
      console.log(error);
      
    }
    
    
  })

      
      
  };

module.exports = {
    getAllMarkers,
    exists,
    build
};