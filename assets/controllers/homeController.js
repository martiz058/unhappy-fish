// Models
const { SiteModel, StoryModel } = require('../models/mongoSchema');

module.exports.getHome = async (req, res) => {
    const itemsPerPage = 6;
    const locations = await SiteModel.find({})
        .limit(6);
    const stories = await StoryModel.find({})
        .limit(2);

    res.render('home/home', { locations, stories });
};

module.exports.sendEmail = (req, res) => {
    console.log('Email Sent');
    res.redirect('/');
};