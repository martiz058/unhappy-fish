// Models
const { SiteModel, ReviewModel } = require('../models/mongoSchema');

//local functions/var
const currentDate = new Date();

const { getAverageRating } = require('../middleware/reviewMiddleware');

module.exports.postReview = async (req, res) => {
    const reviewInfo = {
        userID: req.user._id,
        rating: Number(req.body.rating),
        reviewText: req.body.reviewText,
        date: currentDate.toLocaleString(),
        username: req.user.username
    };

    const site = await SiteModel.findById(req.params.id);
    const review = await ReviewModel.findById(site.reviewID);

    review.reviewList.push(reviewInfo);

    site.totalRating += reviewInfo.rating;
    site.averageRating = getAverageRating(site.totalRating, review.reviewList.length);

    await review.save();
    await site.save();

    res.redirect(`/locations/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    const site = await SiteModel.findById(req.params.id);

    const { reviewId } = req.params;
    const rating = Number(req.body.rating);

    const review = await ReviewModel.findByIdAndUpdate(
        site.reviewID,
        {
            $pull: { reviewList: { _id: reviewId } }
        },
        { new: true }
    );

    //Calulate rating
    site.totalRating += rating;
    site.averageRating = getAverageRating(site.totalRating, review.reviewList.length);

    // await review.save();
    await site.save();

    req.flash('success:', 'Successfully deleted');
    res.redirect(`/locations/${site._id}`);
};

//Issue Here need to add the review edit