const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", quoteController.getAllQuotes);
router.get("/authors/:authorName", quoteController.getQuotesByAuthor);
router.get("/search/:query", quoteController.searchQuotes);
router.get("/category/:category", quoteController.getQuotesByCategory);
router.get("/:id", quoteController.getQuoteById);
router.post("/", authMiddleware, quoteController.createQuote);
router.put("/:id", authMiddleware, quoteController.updateQuote);
router.delete("/:id", authMiddleware, quoteController.deleteQuote);

module.exports = router;
