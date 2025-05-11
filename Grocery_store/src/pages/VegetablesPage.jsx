import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the cart page
import "./page.css";
import carrot from "../assets/carrot.png";
import tomato from "../assets/tomato.png";
import potato from "../assets/potato.png";
import onion from "../assets/onion.png";
import spinach from "../assets/spinach.png";
import capsicum from "../assets/capsicum.png";

const vegetablesProducts = [
  { name: "Carrot", price: 50, oldPrice: 60, quantity: "Approx. 6-8 pieces (1 Kg)", image: carrot },
  { name: "Tomato", price: 40, quantity: "Approx. 5-7 pieces (1 Kg)", image: tomato },
  { name: "Potato", price: 30, quantity: "Approx. 5-6 pieces (1 Kg)", image: potato },
  { name: "Onion", price: 60, oldPrice: 70, quantity: "Approx. 5-7 pieces (1 Kg)", image: onion },
  { name: "Spinach", price: 25, quantity: "1 bunch (250-300g)", image: spinach },
  { name: "Capsicum", price: 45, quantity: "2-3 pieces (500g)", image: capsicum },
];

const VegetablesPage = () => {
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
      <h2 className="page-title">Vegetables</h2>
      <div className="product-list">
        {vegetablesProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="quantity">{product.quantity}</p>
              <div className="price">
                <span className="new-price">₹{product.price}</span>
                {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
              </div>
              <button className="add-btn" onClick={() => addToCart(product)}>
                {cartItems.includes(product.name) ? "View Cart" : "Add to Cart"}
              </button> {/* Dynamic button text */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VegetablesPage;
