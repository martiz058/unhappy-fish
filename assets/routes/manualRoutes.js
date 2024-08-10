const express = require('express');
const router = express.Router();

// Middleware
const manualController = require('../controllers/manualController');

// Route for getting all manual
router.route('/')
    .get(manualController.getHome)

module.exports = router;
