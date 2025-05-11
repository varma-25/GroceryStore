const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
  oldPrice: Number,
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);
