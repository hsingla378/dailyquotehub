const Quote = require("../models/quote");
const Author = require("../models/author");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });

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
    }).sort({ x: -1 });

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

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const { name, designation, description, avatar } = req.body;

    // Check if an author with the given name already exists
    const existingAuthor = await Author.findOne({ name: name.toLowerCase() });
    if (existingAuthor) {
      return res
        .status(400)
        .json({ message: "Author with this name already exists." });
    }

    const newAuthor = new Author({
      name: name.toLowerCase(),
      designation,
      description,
      avatar,
    });

    await newAuthor.save();

    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: "Author deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update author details
exports.updateAuthorDetails = async (req, res) => {
  try {
    const { name, designation, description, avatar } = req.body;
    const authorId = req.params.id;

    // Check if the author exists
    const existingAuthor = await Author.findById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Update only the provided fields
    existingAuthor.name = name || existingAuthor.name;
    existingAuthor.designation = designation || existingAuthor.designation;
    existingAuthor.description = description || existingAuthor.description;
    existingAuthor.avatar = avatar || existingAuthor.avatar;

    // Save the updated author
    await existingAuthor.save();

    res.json(existingAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
