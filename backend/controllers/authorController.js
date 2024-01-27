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

    const quotes = await Quote.aggregate([
      { $match: { "author.name": { $regex: new RegExp(authorName, "i") } } },
      { $sample: { size: 50000 } }, // Adjust the size as needed
    ]);

    if (quotes.length === 0) {
      res.status(404).json({ message: "No quotes found for the specified author." });
    } else {
      res.json(quotes);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAuthorAvatar = async (req, res) => {
  try {
    const { authorName, newAvatarUrl } = req.body;

    // Update all quotes by the specified author
    await Quote.updateMany(
      { "author.name": { $regex: new RegExp(authorName, "i") } },
      { $set: { "author.avatar": newAvatarUrl } }
    );

    res.json({ message: "Author avatar updated successfully for all quotes." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
