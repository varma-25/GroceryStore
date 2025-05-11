// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// POST route to add a product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

module.exports = router;
