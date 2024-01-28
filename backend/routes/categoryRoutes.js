const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get quotes by category
router.get("/:category", categoryController.getQuotesByCategory);

// Update category (change spelling)
router.put("/:category", authMiddleware, categoryController.updateCategory);

// Delete category from all quotes
router.delete("/:category", authMiddleware, categoryController.deleteCategory);

module.exports = router;
