const Cart = require("./Cart"); // Import the Cart model

// Function to clear the cart on server start
const clearCartOnStartup = async () => {
  try {
    await Cart.deleteMany({});
    console.log("🛒 Cart cleared on server start!");
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
  }
};

// Function to get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

module.exports = { clearCartOnStartup, getCartItems };
