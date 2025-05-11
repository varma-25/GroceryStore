require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/authRoutes"); // Changed from userRoutes to authRoutes
const productRoutes = require("./routes/productRoutes");
const { clearCartOnStartup } = require("./models/cartController");

const app = express();
const PORT = process.env.PORT || 5000; // Set the port for the server
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from the .env file

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    clearCartOnStartup(); // Optional: Clear cart data on server start
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/api/users", userRoutes); // Register user (auth) routes
app.use("/api/products", productRoutes); // Register product routes
app.use("/cart", cartRoutes); // Register cart routes

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Grocery Store Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
