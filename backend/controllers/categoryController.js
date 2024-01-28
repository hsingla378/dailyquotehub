const Quote = require("../models/quote");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Quote.aggregate([
      { $unwind: "$categories" },
      { $sample: { size: 50000 } }, // Adjust the size as needed
    ]);

    // Extract unique categories from the result
    const uniqueCategories = [...new Set(categories.map(item => item.categories))];
    res.json(uniqueCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuotesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const quotes = await Quote.find({ categories: { $in: [category] } }).sort({ _id: -1 });

    // Return the quotes in the response
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const oldCategory = req.params.category;
    const newCategory = req.body.newCategory;

    // Update category in all quotes
    await Quote.updateMany(
      { categories: oldCategory },
      { $set: { "categories.$[elem]": newCategory } },
      { arrayFilters: [{ "elem": oldCategory }] }
    );

    res.json({ message: "Category updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryToDelete = req.params.category;

    // Remove category from all quotes
    await Quote.updateMany(
      { categories: categoryToDelete },
      { $pull: { categories: categoryToDelete } }
    );

    res.json({ message: "Category deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};