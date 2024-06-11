const express = require('express');
const router = express.Router();

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const homeController = require('../controllers/homeController');

// Route for getting all locations and posting a new site
router.route('/')
    .get(asyncHandler(homeController.getHome));

module.exports = router;