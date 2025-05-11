import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css"; // Import common CSS file
import thumbsup from "../assets/thumsup750.png";
import sprite from "../assets/sprite750.png";
import pepsi from "../assets/thumsup2.png";
import coke from "../assets/sprite2.png";
import limca from "../assets/limca.png";
import bisleri from "../assets/redbull.png";

const drinksProducts = [
  { name: "Thums Up 750 ml", quantity: "750 ml", price: 45, image: thumbsup },
  { name: "Sprite 750 ml", quantity: "750 ml", price: 45, image: sprite },
  { name: "Thums Up 2L", quantity: "2 Ltr", price: 100, image: pepsi },
  { name: "Sprite 2L", quantity: "2 Ltr", price: 100, image: coke },
  { name: "Limca", quantity: "750 ml", price: 45, image: limca },
  { name: "Red Bull", quantity: "350 ml", price: 100, oldPrice: 120, image: bisleri },
];

const DrinksPage = () => {
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
      <h2 className="page-title">Soft Drinks</h2>
      <div className="product-list">
        {drinksProducts.map((product, index) => (
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

export default DrinksPage;
