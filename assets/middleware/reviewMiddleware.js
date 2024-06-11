const { ReviewModel } = require('../models/mongoSchema');
const { ReviewJoiModel } = require('../models/joiSchema');

function getAverageRating(dividend, divisor) {
    divisor = divisor < 1 ? 1 : divisor;
    let quotient = dividend / divisor;
    return quotient.toFixed(2);
}

async function findOrCreateReview(site) {
    if (!site.reviewID) {
        const newReview = new ReviewModel({ siteID: site._id, });
        await newReview.save();
        site.reviewID = newReview._id;
        await site.save();
    }
    return ReviewModel.findById(site.reviewID);
}

async function validateReview(req, res, next) {
    const { error } = ReviewJoiModel.validate(req.body);
    if (error) {
        siteId = req.params.id;
        req.flash('error', `Review Registration Error: ${error.details[0].message}`);
        return res.redirect(`/locations/${siteId}` || '/');
    }
    next();
}

async function reviewAuthorize(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Not Logged In');
        return res.redirect('/login');
    }

    const reviewDocument = await ReviewModel.findOne({ siteID: req.params.id });
    if (!reviewDocument) {
        req.flash('error', 'Review not found');
        return res.redirect(`/locations/${req.params.id}` || '/locations');
    }

    const review = reviewDocument.siteReviews.id(req.params.reviewId);
    if (!review) {
        req.flash('error', 'Review not found');
        return res.redirect(`/locations/${req.params.id}` || '/locations');
    }

    if (req.user._id.equals(review.userID)) {
        return next();
    }

    req.flash('error', "You're not allowed to edit this");
    return res.redirect(`/locations/${req.params.id}` || '/locations');
}


module.exports = {
    getAverageRating,
    findOrCreateReview,
    validateReview,
    reviewAuthorize,
};
