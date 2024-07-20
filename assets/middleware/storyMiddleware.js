const { StoryModel, } = require('../models/mongoSchema');
const { StoryJoiModel } = require('../models/joiSchema');

async function validateStory(req, res, next) {
    const storyInfo = {
        storyName: req.body.storyName,
        description: req.body.description,
    }

    const { error } = StoryJoiModel.validate(storyInfo);
    if (error) {
        req.flash('error', `Story Registration Error: ${error.details[0].message}`);
        return res.redirect(req.header('Referer') || '/');
    }

    req.storyInfo = storyInfo;
    next();
}

module.exports = {
    validateStory
};
