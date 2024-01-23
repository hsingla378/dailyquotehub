const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", quoteController.getAllQuotes);
router.get("/search", quoteController.searchQuotes);

router.get("/:slug", quoteController.getQuoteBySlug);
router.post("/", authMiddleware, quoteController.createQuote);
router.put("/:id", authMiddleware, quoteController.updateQuote);
router.delete("/:id", authMiddleware, quoteController.deleteQuote);

module.exports = router;
