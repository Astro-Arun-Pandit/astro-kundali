// Importing all the dependencies here
const express = require('express');
const {SampleController} = require('../controllers/sampleController.js');

// Calling the router function
const router = express.Router();

// ALl the routes are defined below

// Main route to test the working of the sample routes
router.route('/').get(SampleController);

// Exporting the router
module.exports = router;
