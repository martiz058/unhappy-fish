const express = require('express');
const router = express.Router();

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const locationController = require('../controllers/locationController');
const { isUserLogin } = require('../middleware/userMiddleware');
const { validateImage } = require('../javascripts/cloudinary');
const { siteAuthorize, validateSite } = require('../middleware/locationMiddleware');

// Route for getting all locations and posting a new site
router.route('/')
    .get(asyncHandler(locationController.getIndex))
    .post(isUserLogin, validateImage, validateSite, asyncHandler(locationController.postSite));

// Route for getting the form to create a new site
router.route('/new')
    .get(isUserLogin, locationController.getNewSiteForm);

// Routes for operations on a specific site identified by its ID
router.route('/:id')
    .get(asyncHandler(locationController.getSiteID))
    .put(siteAuthorize, validateImage, validateSite, asyncHandler(locationController.editSiteID))
    .delete(siteAuthorize, asyncHandler(locationController.deleteSiteID));

// Route for getting the form to edit a specific site
router.route('/:id/edit')
    .get(siteAuthorize, asyncHandler(locationController.getEditSiteForm));

module.exports = router;
