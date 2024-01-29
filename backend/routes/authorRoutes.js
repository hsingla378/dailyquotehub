const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.get("/:authorName", authorController.getQuotesByAuthor);

// New route for updating author avatar
router.post(
  "/update-avatar",
  authMiddleware,
  authorController.updateAuthorAvatar
);

// New route for creating author
router.post("/", authMiddleware, authorController.createAuthor);
router.delete("/:id", authMiddleware, authorController.deleteAuthor);

// New route for updating author details
router.put("/:id", authMiddleware, authorController.updateAuthorDetails);

// New route for getting author by ID
router.get("/get/:id", authorController.getAuthorById);

module.exports = router;
