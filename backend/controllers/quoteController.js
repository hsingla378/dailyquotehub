const Quote = require("../models/quote");
const RSS = require("rss");

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("author")
      .populate("book")
      .sort({ _id: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandomQuotes = async (req, res) => {
  try {
    const quotes = await Quote.aggregate([{ $sample: { size: 50000 } }]);
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchQuotes = async (req, res) => {
  const value = req.query.value; // Change this line to use req.query.query
  try {
    const quotes = await Quote.find({
      $or: [
        { title: { $regex: value, $options: "i" } },
        { "author.name": { $regex: value, $options: "i" } },
        { categories: { $in: [new RegExp(value, "i")] } },
      ],
    }).sort({ _id: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuoteBySlug = async (req, res) => {
  try {
    const quote = await Quote.findOne({ slug: req.params.slug });
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuote = async (req, res) => {
  const quote = new Quote(req.body);

  // Generate a unique slug with a maximum of 10 words
  let baseSlug = quote.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  let words = baseSlug.split("-");
  let finalSlug = words.slice(0, 10).join("-"); // Limit to the first 10 words
  let count = 1;

  while (true) {
    try {
      const existingQuote = await Quote.findOne({ slug: finalSlug });
      if (!existingQuote) {
        break;
      }
      // If slug exists, add a suffix and try again
      finalSlug = `${baseSlug}-${count}`;
      count++;
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  }

  quote.slug = finalSlug;

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRssFeed = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ _id: -1 });

    const feed = new RSS({
      title: "Your Quote RSS Feed",
      description: "Latest quotes from your collection",
      feed_url: "http://yourdomain.com/api/quotes/rss", // Change this URL to your actual domain and endpoint
      site_url: "http://yourdomain.com", // Change this URL to your actual domain
    });

    quotes.forEach((quote) => {
      feed.item({
        title: quote.title,
        description: quote.description,
        url: `http://yourdomain.com/api/quotes/${quote.slug}`, // Change this URL to your actual domain and quote endpoint
        author: quote.author.name,
        date: quote.createdAt,
      });
    });

    res.set("Content-Type", "application/xml");
    res.send(feed.xml({ indent: true }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
