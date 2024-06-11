const express = require('express');
const router = express.Router({ mergeParams: true });

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const reviewController = require('../controllers/reviewController');
const { isUserLogin } = require('../middleware/userMiddleware');
const { validateReview, reviewAuthorize } = require('../middleware/reviewMiddleware');

// Route posting review
router.route('/')
    .post(isUserLogin, validateReview, asyncHandler(reviewController.postReview));

// Route deleting review
router.route('/:reviewId')
    .delete(reviewAuthorize, asyncHandler(reviewController.deleteReview));

module.exports = router;
