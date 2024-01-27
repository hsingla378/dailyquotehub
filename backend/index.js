const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const rssRoutes = require("./routes/rssRoutes");
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(mongoSanitize());

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected Successfully"))

  .catch((err) => {
    console.error(err);
  });

// Routes
app.use("/auth", authRoutes);
app.use("/quotes", quoteRoutes);
app.use("/authors", authorRoutes);
app.use("/categories", categoryRoutes);
app.use("/rss", rssRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
