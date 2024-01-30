const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.get("/:authorName", authorController.getQuotesByAuthor);
router.get("/id/:id", authorController.getAuthorById);  // Existing route to get author by ID

// New route for updating author avatar
router.post("/update-avatar", authMiddleware, authorController.updateAuthorAvatar);

// New route for creating author
router.post("/", authMiddleware, authorController.createAuthor);
router.delete("/:id", authMiddleware, authorController.deleteAuthor);

// New route for updating author details
router.put("/:id", authMiddleware, authorController.updateAuthorDetails);

// New route to get all quotes by author
router.get("/get/:authorName", authorController.getAllQuotesByAuthor);

// New route to get author information by name
router.get("/info/:authorName", authorController.getAuthorInfoByName);

module.exports = router;
