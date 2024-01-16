const Quote = require("../models/quote");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Quote.distinct("categories");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuotesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const quotes = await Quote.find({ categories: { $in: [category] } });

    // Return the quotes in the response
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
