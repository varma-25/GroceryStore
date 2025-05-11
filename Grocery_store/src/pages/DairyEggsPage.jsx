import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import Milk1 from "../assets/milk1.png";
import Milk2 from "../assets/milk2.png";
import Bmilk from "../assets/bmilk.png";
import Paneer from "../assets/paneer.png";
import Eggs from "../assets/eggs.png";

const deProducts = [
  { name: "Sangam Dairy Pasteurised Full Cream Milk", quantity: "500 ml", price: 32, oldPrice: 35, image: Milk1 },
  { name: "Sangam Dairy Homogenised & Pasteurised Toned Milk", quantity: "500 ml", price: 25, oldPrice: 28, image: Milk2 },
  { name: "Sangam Dairy Butter Milk", quantity: "200 ml", price: 9, image: Bmilk },
  { name: "Sangam Dairy Paneer", quantity: "250 gm", price: 80, oldPrice: 90, image: Paneer },
  { name: "Farm Fresh Eggs", quantity: "6 pieces", price: 40, oldPrice: 45, image: Eggs },
];

const DePage = () => {
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
      <h2 className="page-title">Dairy & Eggs</h2> {/* Corrected category name */}
      <div className="product-list">
        {deProducts.map((product, index) => (
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

export default DePage;
