const express = require('express');
const router = express.Router();

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const storyController = require('../controllers/storyController');
const { isUserLogin } = require('../middleware/userMiddleware');
const { validateStory } = require('../middleware/storyMiddleware');

// Route for getting all stories and posting a new story
router.route('/')
    .get(asyncHandler(storyController.getIndex))
    .post(isUserLogin, validateStory, asyncHandler(storyController.postStory));

router.route('/new')
    .get(isUserLogin, storyController.getNewStoryForm);

module.exports = router;
