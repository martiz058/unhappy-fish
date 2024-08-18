const { SiteModel, } = require('../models/mongoSchema');
const { SiteJoiModel } = require('../models/joiSchema');
const getCoordinates = require('../javascripts/mapbox');

async function siteAuthorize(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Not Logged In');
        return res.redirect('/login');
    }

    const site = await SiteModel.findById(req.params.id);
    if (!site) {
        req.flash('error', 'Site not found');
        return res.redirect('/locations');
    }

    if (req.user._id.equals(site.userID)) {
        return next();
    }

    req.flash('error', "You're not allowed to edit this");
    return res.redirect(`/locations/${site._id}` || '/locations');
}

async function validateSite(req, res, next) {
    const siteInfo = {
        name: req.body.name,
        textBody: req.body.textBody,
        geoJson: getCoordinates(req.body.geoJson)
    }

    const { error } = SiteJoiModel.validate(siteInfo);
    if (error) {
        req.flash('error', `Site Registration Error: ${error.details[0].message}`);
        return res.redirect(req.header('Referer') || '/');
    }

    req.siteInfo = siteInfo;
    next();
}

module.exports = {
    siteAuthorize,
    validateSite
};
