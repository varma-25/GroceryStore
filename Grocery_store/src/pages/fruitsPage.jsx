import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the cart page
import "./page.css";
import apple from "../assets/apple.png";
import banana from "../assets/banana.png";
import Bgrapes from "../assets/bgrapes.png";
import grapes from "../assets/grapes.png";
import watermelon from "../assets/wmelon.png";
import orange from "../assets/orange.png";

const fruitsProducts = [
  { name: "Apples", price: 150, quantity: "3-4 pieces (1 Kg)", image: apple },
  { name: "Banana", price: 60, quantity: "12 pieces", image: banana },
  { name: "Grapes", price: 80, quantity: "Bunch (500g)", image: grapes },
  { name: "Black Grapes", price: 100, quantity: "Bunch (500g)", image: Bgrapes },
  { name: "Orange", price: 30, quantity: "4-5 pieces (1 Kg)", image: orange },
  { name: "Watermelon", price: 100, oldPrice: 120, quantity: "1 piece (2-3 kg)", image: watermelon },
];

const FruitsPage = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const navigate = useNavigate();

  // Fetch existing cart items on component mount
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.map((item) => item.name)); // Store only item names for easy comparison
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  // Function to add items to the cart
  const addToCart = (product) => {
    if (cartItems.includes(product.name)) {
      navigate("/cart"); // Redirect to cart if already added
      return;
    }

    const cartItem = {
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity set to 1
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
        setCartItems((prev) => [...prev, product.name]); // Update state
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  return (
    <div className="main-container">
      <h2 className="page-title">Fruits</h2>
      <div className="product-list">
        {fruitsProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="quantity">{product.quantity}</p>
              <div className="price">
                <span className="new-price">₹{product.price}</span>
                {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
              </div>
              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                {cartItems.includes(product.name) ? "View Cart" : "Add to Cart"}
              </button> {/* Dynamic button text */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitsPage;