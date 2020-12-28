const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "waysbucks",
  allowedFormats: ["jpg", "png"],
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const fileFilter = (req, file, cb) => {
  if (!file.mimetype == "image/png" && !file.mimetype == "image/jpg") {
    cd(null, false);
    return cb(new Error("Invalid image format"));
  } else {
    cb(null, true);
  }
};

module.exports = parser = multer({ storage: storage, fileFilter: fileFilter });
