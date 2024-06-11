const { UserJoiModel } = require('../models/joiSchema');

function isUserLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Not Logged In');
        return res.redirect('/login');
    }
    next();
}

function isUserNotLogin(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('error', `Already sigined in as: ${req.user.username}`);
        return res.redirect('/locations');
    }
    next();
}

async function validateUser(req, res, next) {
    const { error } = UserJoiModel.validate(req.body);
    if (error) {
        req.flash('error', `User Registration Error: ${error.details[0].message}`);
        return res.redirect('/register');
    }
    next();
}

module.exports = {
    isUserLogin,
    isUserNotLogin,
    validateUser
};
