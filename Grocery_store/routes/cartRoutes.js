const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// ✅ Get all cart items
router.get("/", async (req, res) => {
    try {
        const items = await Cart.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart items" });
    }
});

// ✅ Add item to cart
router.post("/", async (req, res) => {
    try {
        const { name, price, image, quantity } = req.body;
        const newItem = new Cart({ name, price, image, quantity });
        await newItem.save();
        res.status(201).json({ message: "Item added to cart", item: newItem });
    } catch (err) {
        res.status(500).json({ message: "Error adding item" });
    }
});

// ✅ Delete an item from cart
router.delete("/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Error removing item" });
    }
});

module.exports = router; // ✅ Export the router
