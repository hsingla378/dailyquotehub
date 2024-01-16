const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);

module.exports = router;
