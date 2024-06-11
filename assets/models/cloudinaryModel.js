const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
};

const multerConfig = {
    dest: './public/data/uploads/',
    // limits: { files: 5 }, // Limit the number of files to 5
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
};

cloudinary.config(cloudinaryConfig);
const upload = multer(multerConfig).array('images', 5);

module.exports = {
    cloudinary,
    upload
};
