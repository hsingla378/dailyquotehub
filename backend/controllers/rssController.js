const Quote = require("../models/quote");
const RSS = require("rss");

exports.getRssFeed = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ _id: -1 });

    const feed = new RSS({
      title: "Best Quotes from Renowned Authors | DailyQuoteHub - Your Source of Inspiration",
      description:
        "Explore a vast collection of inspirational quotes by famous authors and unique creations. Daily Quote Hub is your source for meaningful quotes, wisdom, and motivation. Discover a world of inspiration every day.",
      feed_url: "https://dailyquotehub-backend.onrender.com/rss", // Update with your actual domain and endpoint
      site_url: "https://dailyquotehub-backend.onrender.com", // Update with your actual domain
    });

    quotes.forEach((quote) => {
      feed.item({
        title: quote.title,
        description: quote.description,
        url: `https://www.dailyquotehub.com/quotes/${quote.slug}`, // Update with your actual domain and quote endpoint
        author: quote.author.name,
        date: quote.createdAt,
        categories: quote.categories, // Include categories in the feed
        enclosure: {
          url: quote.thumbnail, // Include thumbnail image in the feed
        },
      });
    });

    res.set("Content-Type", "application/xml");
    res.send(feed.xml({ indent: true }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
