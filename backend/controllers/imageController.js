exports.uploadQuoteImage = async (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
};

exports.uploadAuthorImage = async (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
};

exports.uploadBookImage = async (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
};
