import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import SunflowerOil from "../assets/sfoil.png";
import MustardOil from "../assets/moil.png";
import CoconutOil from "../assets/rboil.png";
import OliveOil from "../assets/ooil.png";
import Ghee from "../assets/bghee.png";
import Butter from "../assets/butter.png";

const oilsFatsProducts = [
  { name: "Freedom Refined Sunflower Oil", quantity: "1 L", price: 170, oldPrice: 180, image: SunflowerOil },
  { name: "Fortune Premium Kachi Ghani Pure Mustard Oil", quantity: "1 Ltr", price: 180, oldPrice: 225, image: MustardOil },
  { name: "Freedom Refined Rice Bran Oil", quantity: "1 Ltr", price: 190, oldPrice: 194, image: CoconutOil },
  { name: "Figaro Spanish Brand Pure Olive Oil", quantity: "1 Ltr", price: 1599, oldPrice: 2119, image: OliveOil },
  { name: "GRB Buffalo Ghee", quantity: "200 ml", price: 172, oldPrice: 180, image: Ghee },
  { name: "Amul Salted Butter", quantity: "100 gm", price: 60, image: Butter },
];

const OilsFatsPage = () => {
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
      <h2 className="page-title">Oils & Fats</h2>
      <div className="product-list">
        {oilsFatsProducts.map((product, index) => (
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

export default OilsFatsPage;
