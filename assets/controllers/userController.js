// Models
const { UserModel } = require('../models/mongoSchema');

module.exports.getRegister = (req, res) => {
    res.render('users/register');
};

module.exports.postRegister = async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = new UserModel({ email, username });

    await UserModel.register(newUser, password);

    req.login(newUser, (err) => {
        if (err) {
            req.flash('error', 'Sorry, could not be logged in');
            res.redirect('/login');
        }
        req.flash('success', `${req.user.username} registered and logged in successfully!`);
        res.redirect('/');
    });
};

module.exports.getLogin = (req, res) => {
    res.render('users/login');
};

module.exports.postLogin = (req, res) => {
    const username = req.user.username;
    req.flash('success', `Welcome back!!, ${username}!`);
    res.redirect('/');
};

module.exports.getLogout = (req, res, next) => {
    const username = req.user.username;
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Opps, something went wrong');
            return next(err);
        }
        req.flash('error', `Good Bye, ${username}`);
        res.redirect('/');
    });
};
