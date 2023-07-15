const express = require('express');
const { Marker } = require('../models/marker.model');
const db = require('../services/db');
const router = express.Router();
const markerController = require('../controllers/marker.controller');

// Get all markers in the markers table
router.get('/all', markerController.getAllMarkers);

// Check if a marker exists in the database already
router.get('/exists', markerController.exists);

// Build a new marker and save it in the database
router.post('/build', markerController.build);

module.exports = router;