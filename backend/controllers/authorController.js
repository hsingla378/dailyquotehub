// controllers/authorController.js
const Quote = require("../models/quote");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Quote.distinct("author.name");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
