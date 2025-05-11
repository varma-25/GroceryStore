const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config(); // Load environment variables
const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key"; // Secret key for JWT

// Register Route (without password hashing for testing purposes)
router.post("/register", async (req, res) => {
    try {
        console.log("🔥 Register Request Received:", req.body);

        const { fullName, email, password, role } = req.body;

        // Ensure all fields are provided
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const newUser  = new User({ fullName, email, password, role });
        await newUser .save();

        res.status(201).json({ message: "User  registered successfully" });

    } catch (error) {
        console.error("❌ Register Error:", error); // Log the entire error object
        res.status(500).json({ error: error.message || "Registration failed" });
    }
});


// Signup Route (without password encryption for testing purposes)
router.post("/signup", async (req, res) => {
    try {
        console.log("🔥 Signup Request Received:", req.body);

        const { fullName, email, password, role } = req.body;

        // Ensure all fields are provided
        if (!fullName || !email || !password || !role) {
            console.log("❌ Missing fields:", { fullName, email, password, role });
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("⚠️ Email already exists:", email);
            return res.status(400).json({ error: "Email already registered" });
        }

        console.log("✅ Email is unique, proceeding with registration.");

        // Skip hashing for testing purposes (using plain password)
        const newUser = new User({ fullName, email, password, role });

        console.log("🔄 Saving user:", newUser);

        await newUser.save();

        console.log("✅ User Registered Successfully:", newUser);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Signup Error:", error.message || error);
        res.status(500).json({ error: error.message || "Signup failed" });
    }
});

module.exports = router;
