const joi = require('joi');

const UserSchema = joi.object({
    email: joi.string().min(3).max(30).trim().required(),
    username: joi.string().min(3).max(30).trim().required(),
    password: joi.string().min(3).max(30).trim().required()
}).required();

const SiteSchema = joi.object({
    siteName: joi.string().min(3).max(300).trim().required(),
    description: joi.string().min(3).max(300).trim().required(),
    locationInfo: joi.object({
        geometry: joi.object({
            type: joi.string().min(3).max(300).trim().required(),
            coordinates: joi.array().items(joi.number()).required()
        }).required(),
        properties: joi.object({
            name: joi.string().min(3).max(300).trim().required(),
            place_formatted: joi.string().min(3).max(300).trim().required(),
            full_address: joi.string().min(3).max(300).trim().required()
        }).required()
    }).required()
}).required();

const StorySchema = joi.object({
    storyName: joi.string().min(3).max(1000).trim().required(),
    description: joi.string().min(3).max(1000).trim().required()
}).required();

const ReviewSchema = joi.object({
    rating: joi.number().min(1).max(5).required(),
    reviewText: joi.string().min(3).max(300).required()

}).required()

module.exports = {
    UserJoiModel: UserSchema,
    SiteJoiModel: SiteSchema,
    ReviewJoiModel: ReviewSchema,
    StoryJoiModel: StorySchema
};
