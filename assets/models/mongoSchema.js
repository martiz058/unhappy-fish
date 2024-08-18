const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true,
        required: true
    }
});
UserSchema.plugin(require('passport-local-mongoose'), { usernameUnique: true });

const GeoSchema = new mongoose.Schema({
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    properties: {
        name: String,
        place_formatted: String,
        full_address: String
    }
});

const ImageSchema = new mongoose.Schema({
    name: String,
    url: String,
    public_id: String
});

const ReviewSchema = new mongoose.Schema({
    siteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'site_collection'
    },
    siteReviews: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user_collection'
        },
        rating: {
            type: Number,
            minlength: 1,
            maxlength: 5,
        },
        reviewText: {
            type: String,
            minlength: 3,
            maxlength: 300,
        },
        date: String,
        username: String
    }]
});

const SiteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_collection',
        required: true
    },
    siteName: String,
    description: String,
    author: String,
    date: String,
    averageRating: Number,
    totalRating: Number,
    locationInfo: GeoSchema,
    image: [ImageSchema],
    reviewID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review_collection'
    }
});

const StorySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_collection',
        required: true
    },
    name: String,
    textBody: String,
    author: String,
    date: String,
})
//-------------------

module.exports = {
    UserModel: mongoose.model('user_collection', UserSchema),
    SiteModel: mongoose.model('site_collection', SiteSchema),
    ReviewModel: mongoose.model('review_collection', ReviewSchema),
    StoryModel: mongoose.model('story_collection', StorySchema)
};
