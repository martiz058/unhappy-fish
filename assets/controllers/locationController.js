// Models
const { SiteModel, ReviewModel } = require('../models/mongoSchema');

// Local functions/var
const currentDate = new Date();
const { uploadImages } = require('../javascripts/cloudinary');
const { findOrCreateReview } = require('../middleware/reviewMiddleware');

module.exports.getIndex = async (req, res) => {
    // Pagination
    const itemsPerPage = 8;

    const totalItems = await SiteModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // if currentPage < 0 || totalPages < currentPage
    let currentPage = Math.min(parseInt(req.query.page) || 1, totalPages);
    currentPage = Math.max(currentPage, 1);
    //---

    const startIndex = (currentPage - 1) * itemsPerPage;
    //=====

    const locations = await SiteModel.find({})
        .skip(startIndex)
        .limit(itemsPerPage);

    res.render('locations/locationIndex', { locations, totalPages, currentPage });
};

module.exports.postSite = async (req, res) => {
    req.siteInfo.userID = req.user._id;
    req.siteInfo.username = req.user.username;
    req.siteInfo.date = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    req.siteInfo.averageRating = 0;
    req.siteInfo.totalRating = 0;

    const newSite = new SiteModel(req.siteInfo);

    await findOrCreateReview(newSite);
    newSite.imageList = await uploadImages(req.files);

    await newSite.save();

    req.flash('success', `${newSite.name} has been uploaded`);
    res.redirect(`/locations/${newSite._id}`);
};

module.exports.getNewSiteForm = async (req, res) => {
    res.render('locations/locationNew');
};

module.exports.getSiteID = async (req, res) => {
    try {
        const site = await SiteModel.findById(req.params.id);
        if (!site) {
            req.flash('error', 'Site not found');
            return res.redirect('/locations');
        }
        const review = await findOrCreateReview(site);
        const reviews = review.reviewList;

        let editFlag = false;
        let reviewFlag = false;

        if (req.isAuthenticated()) {
            const userId = req.user._id;
            reviewFlag = !reviews.some(review => review.userID.equals(userId));

            if (userId.equals(site.userID)) {
                editFlag = true;
                reviewFlag = false; // User cannot comment on their own site
            }
        }
        res.render('locations/locationShow', { site, reviews, editFlag, reviewFlag });
    } catch {
        req.flash('error', 'Site not found');
        return res.redirect('/locations');
    }
};

module.exports.editSiteID = async (req, res) => {
    req.siteInfo.date = `Updated ${currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}`;

    const updateSite = await SiteModel.findByIdAndUpdate(req.params.id, req.siteInfo, { new: true });

    deleteImages = req.body.selectedImages;
    const addImages = await uploadImages(req.files, deleteImages);

    if (deleteImages) {
        await updateSite.updateOne(
            { $pull: { image: { public_id: { $in: deleteImages } } } }
        );
    }

    updateSite.imageList.push(...addImages);
    await updateSite.save();

    req.flash('success', `${updateSite.name} has been updated`);
    res.redirect(`/locations/${req.params.id}`);
};

module.exports.deleteSiteID = async (req, res) => {
    const site = await SiteModel.findByIdAndDelete(req.params.id);
    await ReviewModel.findByIdAndDelete(site.reviewID);

    req.flash('success:', 'Successfully deleted');
    res.redirect('/locations');
};

module.exports.getEditSiteForm = async (req, res) => {
    const site = await SiteModel.findById(req.params.id);
    res.render('locations/locationEdit', { site });
};