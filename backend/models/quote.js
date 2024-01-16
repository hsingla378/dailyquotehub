const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: [String],
  author: {
    name: { type: String, lowercase: true },
    designation: String,
    description: String,
    avatar: String,
  },
  thumbnail: String,
  amazonLink: String,
});

module.exports = mongoose.model("Quote", quoteSchema);
