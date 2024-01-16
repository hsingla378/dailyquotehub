const Quote = require("../models/quote");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Quote.aggregate([
      {
        $group: {
          _id: "$author.name",
          author: { $first: "$author" },
        },
      },
      {
        $replaceRoot: { newRoot: "$author" },
      },
    ]);

    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuotesByAuthor = async (req, res) => {
  try {
    const authorNameParam = req.params.authorName;
    const authorName = authorNameParam.toLowerCase().split("-").join(" ");

    const quotes = await Quote.find({
      "author.name": { $regex: new RegExp(authorName, "i") },
    });

    if (quotes.length === 0) {
      res
        .status(404)
        .json({ message: "No quotes found for the specified author." });
    } else {
      res.json(quotes);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
