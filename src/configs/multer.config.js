const multer = require('multer');

const createMulter = () => {
    const storage = multer.memoryStorage();
    
    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type');
            error.code = 'INVALID_FILE_TYPE';
            return cb(error, false);
        }
        cb(null, true);
    }

    return multer({
        storage : storage,
        fileFilter : fileFilter
    })
}

module.exports = createMulter;