const express = require("express");
const router = express.Router();
const rssController = require("../controllers/rssController");

// New route for RSS feed
router.get("/", rssController.getRssFeed);

module.exports = router;
