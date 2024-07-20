const express = require('express');
const router = express.Router();

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const storiesController = require('../controllers/storiesController');
const { isUserLogin } = require('../middleware/userMiddleware');
const { validateStory } = require('../middleware/storyMiddleware');

// Route for getting all stories and posting a new story
router.route('/')
    .get(asyncHandler(storiesController.getIndex))
    .post(isUserLogin, validateStory, asyncHandler(storiesController.postStory));

router.route('/new')
    .get(isUserLogin, storiesController.getNewStoryForm);

module.exports = router;
