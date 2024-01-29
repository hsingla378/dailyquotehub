const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  designation: String,
  description: String,
  avatar: String,
});

module.exports = mongoose.model("Author", authorSchema);
