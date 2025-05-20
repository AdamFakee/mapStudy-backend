const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

// Cấu hình Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});


let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(buffer).pipe(stream);
    });
};

async function upload(buffer) {
    let result = await streamUpload(buffer);
    return result.secure_url;
}


module.exports.uploadMultiMedia = async (req, res, next) => {
  try {
    // && req.files.mimetype.startsWith('image/')
    // Xử lý upload ảnh nếu có
    const imgUrls = [];
    if (req.files.length > 0 ) {
        // Sử dụng Promise.all để xử lý các tác vụ upload bất đồng bộ
      const uploadPromises = req.files.map(async (file) => {
        const url = await upload(file.buffer);
        return url;
      });

      // Đợi tất cả các file được upload xong
      const uploadedUrls = await Promise.all(uploadPromises);
      imgUrls.push(...uploadedUrls); // Thêm các URL vào mảng imgUrls
    }
    req.imgUrls = imgUrls; 
    // Tiếp tục đến controller tiếp theo
    next();
  } catch (error) {
    throw error;
  }
};


module.exports.uploadMedia = async (req, res, next) => {
  try {
    // && req.files.mimetype.startsWith('image/')
    // Xử lý upload ảnh nếu có
    console.log(req.file)
    console.log(req.body)
    if (req.file ) {
      const url = await upload(req.file.buffer);
      req.imgUrl = url;
    }
    // Tiếp tục đến controller tiếp theo
    next();
  } catch (error) {
    throw error;
  }
};

