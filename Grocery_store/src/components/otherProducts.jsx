import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the cart page
import "./component.css"; // Reusing styles
import Bread from "../assets/brice.png";
import OliveOil from "../assets/ooil.png";
import Almonds from "../assets/paneer.png";
import Rice from "../assets/brice.png";

// Simulate the newly added products, this can be passed from a parent component or fetched from API.
const newlyAddedProducts = [
  { name: "New Olive Oil 500ml", category: "Cooking Essentials", price: 250, oldPrice: 350, image: OliveOil },
  { name: "New Almonds 500g", category: "Dry Fruits", price: 400, oldPrice: 500, image: Almonds },
];

const otherProducts = [
  { name: "Whole Wheat Bread", category: "Bakery", price: 50, oldPrice: 65, image: Bread },
  { name: "Olive Oil 500ml", category: "Cooking Essentials", price: 299, oldPrice: 350, image: OliveOil },
  { name: "Almonds 500g", category: "Dry Fruits", price: 450, oldPrice: 500, image: Almonds },
  { name: "Basmati Rice 1kg", category: "Groceries", price: 150, oldPrice: 180, image: Rice },
];

const OtherProducts = () => {
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const navigate = useNavigate();

  // Fetch existing cart items on component mount
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.map((item) => item.name)); // Store only item names for quick lookup
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  // Function to add items to the cart
  const addToCart = (item) => {
    if (cartItems.includes(item.name)) {
      navigate("/cart"); // Redirect to cart if already added
      return;
    }

    const cartItem = {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1, // Default quantity
    };

    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems((prev) => [...prev, item.name]); // Update state to reflect added item
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  return (
    <div className="store-items">
      <h2>Other Products</h2>

      {/* Display Existing Other Products */}
      <div className="items-list">
        {otherProducts.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p className="category">{item.category}</p>
              <h3>{item.name}</h3>
              <div className="price">
                <span className="new-price">₹{item.price}</span>
                <span className="old-price">₹{item.oldPrice}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                {cartItems.includes(item.name) ? "View Cart" : "Add to Cart"}
              </button> {/* Dynamic button text */}
            </div>
          </div>
        ))}
      </div>

      {/* New to Store Section */}
      <h3>New to Store</h3>
      <div className="items-list">
        {newlyAddedProducts.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p className="category">{item.category}</p>
              <h3>{item.name}</h3>
              <div className="price">
                <span className="new-price">₹{item.price}</span>
                <span className="old-price">₹{item.oldPrice}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                {cartItems.includes(item.name) ? "View Cart" : "Add to Cart"}
              </button> {/* Dynamic button text */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherProducts;
