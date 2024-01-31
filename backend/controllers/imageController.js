const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.uploadImage = async (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
};
