// controllers/authorController.js
const Quote = require("../models/quote");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Quote.distinct("categories");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
