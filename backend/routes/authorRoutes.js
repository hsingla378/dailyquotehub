const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.get("/:authorName", authorController.getQuotesByAuthor);

// route for updating author avatar
router.post("/update-avatar", authorController.updateAuthorAvatar);

module.exports = router;
