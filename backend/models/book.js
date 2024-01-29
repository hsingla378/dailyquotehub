// bookModel.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  image: String,
  amazonLink: String,
});

module.exports = mongoose.model("Book", bookSchema);
