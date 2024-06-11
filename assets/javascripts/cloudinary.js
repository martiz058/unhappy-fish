const { cloudinary, upload } = require('../models/cloudinaryModel');

function validateImage(req, res, next) {
    upload(req, res, (err) => {
        if (!err) {
            next();
        } else if (err.message === 'Only image files are allowed!') {
            req.flash('error', err.message);    // Handle file filter error for non-image files
            return res.redirect(req.header('Referer') || '/');

        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            req.flash('error', 'You can only upload up to 5 images.');
            return res.redirect(req.header('Referer') || '/'); // Redirect to the previous page or home

        } else if (err) {
            req.flash('error', 'Opps something went wrong');
            return res.redirect('/locations');
        }
    });
}

async function uploadImages(uploadfiles, deleteImages = null) {
    if (deleteImages) {
        if (Array.isArray(deleteImages)) {
            for (let img of deleteImages) {
                await cloudinary.uploader.destroy(img);
            }
        } else {
            await cloudinary.uploader.destroy(deleteImages);
        }
    }

    return Promise.all(
        uploadfiles.map(
            async (file) => {
                const { path, filename, originalname } = file;
                try {
                    const uploadResult = await cloudinary.uploader.upload(path, {
                        public_id: filename
                    });
                    return {
                        imageUrl: uploadResult.secure_url,
                        imageName: originalname,
                        public_id: filename
                    };
                } catch {
                    return null;
                }
            }
        )
    );
}

module.exports = {
    validateImage,
    uploadImages
};
