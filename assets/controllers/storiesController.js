// Models
const { StoryModel } = require('../models/mongoSchema');

// Local functions/var
const currentDate = new Date();

module.exports.getIndex = async (req, res) => {
    res.render('stories/storyIndex');
}
