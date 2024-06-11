// Models
const { SiteModel } = require('../models/mongoSchema');

module.exports.getHome = async (req, res) => {
    // Pagination
    const itemsPerPage = 4;
    const locations = await SiteModel.find({})
        .limit(itemsPerPage);

    // content
    const features = [{
        image: "/data/images/fish-spin.png", title: "Upload Photos",
        text: "Share your fishing experiences with the community", animation: "spin-image"
    }, {
        image: "/data/images/starfish-0.png", title: "Rate Locations",
        text: "Rate and discover the best fishing spots.", animation: "star"
    }, {
        image: "/data/images/work-in-progress.png", title: "User Stories",
        text: "Read and share stories from fellow fishers."
    }, {
        image: "/data/images/work-in-progress.png"
        , title: "Fishing Manuals", text: "Learn new techniques and improve your skills."
    }];

    const imageUrls = [
        "/data/images/fish-0.png",
        "/data/images/fish-1.png",
        "/data/images/fish-2.png",
        "/data/images/fish-3.png",
        "/data/images/fish-4.png",
        "/data/images/fish-5.png",
        "/data/images/fish-6.png",
        "/data/images/fish-7.png",
    ];

    res.render('home/home', { locations, features, imageUrls });
};
