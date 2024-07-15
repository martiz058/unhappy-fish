const express = require('express');
const router = express.Router();

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const storiesController = require('../controllers/storiesController');

// Route for getting all stories and posting a new story
router.route('/')
    .get(asyncHandler(storiesController.getIndex));

module.exports = router;
