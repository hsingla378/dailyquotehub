const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: [String],
  thumbnail: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  slug: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Quote", quoteSchema);
