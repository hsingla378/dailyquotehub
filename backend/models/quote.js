const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: [String],
  thumbnail: String,
  author: {
    name: { type: String, lowercase: true },
    designation: String,
    description: String,
    avatar: String,
  },
  book: {
    name: String,
    image: String,
    amazonLink: String,
  },
});

module.exports = mongoose.model("Quote", quoteSchema);
