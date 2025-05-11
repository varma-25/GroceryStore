const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // Move to .env in production

// Render signup page
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

// Render login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.render("signup", { error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.redirect("/login");
  } catch (err) {
    console.error("Register error:", err);
    res.render("signup", { error: "Server error during registration" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // ✅ On successful login, redirect to React frontend
    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error("Login error:", err);
    res.render("login", { error: "Server error during login" });
  }
});

// API: Get User (Optional protected route)
router.get("/user", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

module.exports = router;
