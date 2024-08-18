// Models
const { StoryModel } = require('../models/mongoSchema');

// Local functions/var
const currentDate = new Date();

module.exports.getIndex = async (req, res) => {
    // Pagination
    const itemsPerPage = 6;

    const totalItems = await StoryModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // if currentPage < 0 || totalPages < currentPage
    let currentPage = Math.min(parseInt(req.query.page) || 1, totalPages);
    currentPage = Math.max(currentPage, 1);
    //---

    const startIndex = (currentPage - 1) * itemsPerPage;
    //=====

    const stories = await StoryModel.find({})
        .skip(startIndex)
        .limit(itemsPerPage);

    res.render('stories/storyIndex', { stories, totalPages, currentPage });
};

module.exports.postStory = async (req, res) => {
    req.storyInfo.userID = req.user._id;
    req.storyInfo.author = req.user.username;
    req.storyInfo.date = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });


    const newStory = new StoryModel(req.storyInfo);
    await newStory.save();

    req.flash('success', `${newStory.name} has been uploaded`);
    res.redirect('/stories'); //${newSite._id}`);
};

module.exports.getNewStoryForm = (req, res) => {
    res.render('stories/storyNew');
};