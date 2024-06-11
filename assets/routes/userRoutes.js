const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware
const asyncHandler = require('../javascripts/asyncHandler');
const userController = require('../controllers/userController');
const { isUserNotLogin, isUserLogin, validateUser } = require('../middleware/userMiddleware');

// Route for getting register form and registering user
router.route('/register')
    .get(isUserNotLogin, userController.getRegister)
    .post(isUserNotLogin, validateUser, asyncHandler(userController.postRegister));

// Route for getting login form and login user
router.route('/login')
    .get(isUserNotLogin, userController.getLogin)
    .post(isUserNotLogin,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        userController.postLogin
    );

// Route for logginf out user
router.route('/logout')
    .get(isUserLogin, userController.getLogout);

module.exports = router;
