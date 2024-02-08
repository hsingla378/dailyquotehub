const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../controllers/imageController");

const storageForQuoteImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/quotes/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadQuoteImage = multer({ storage: storageForQuoteImage });

router.post(
  "/quote",
  uploadQuoteImage.single("image"),
  imageController.uploadQuoteImage
);

const storageForAuthorImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/authors/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadAuthorImage = multer({ storage: storageForAuthorImage });

router.post(
  "/author",
  uploadAuthorImage.single("image"),
  imageController.uploadAuthorImage
);

const storageForBookImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/books/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadBookImage = multer({ storage: storageForBookImage });

router.post(
  "/book",
  uploadBookImage.single("image"),
  imageController.uploadBookImage
);

module.exports = router;
