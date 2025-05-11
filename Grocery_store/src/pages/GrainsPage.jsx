import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import grain1 from "../assets/grain1.png";
import grain2 from "../assets/grain2.png";
import grain3 from "../assets/grain3.png";
import grain4 from "../assets/grain4.png";


const grainsProducts = [
  { name: "Daawat Pulav Basmati Rice", quantity: "5 Kg", price: 450, oldPrice: 500, image: grain1 },
  { name: "Nestle Cerelac 5 Grains & Fruits Baby Cereal", quantity: "5 Kg", price: 220, oldPrice: 250, image: grain2 },
  { name: "Vijay Murmura Puffed Rice", quantity: "1 Kg", price: 80, oldPrice: 100, image: grain3 },
  { name: "Bagrry's 100% Whole Grain Oats Flour", quantity: "1 Kg", price: 80, oldPrice: 100, image: grain4 },
];

const GrainsPage = () => {
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
      <h2 className="page-title">Grains</h2>
      <div className="product-list">
        {grainsProducts.map((product, index) => (
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

export default GrainsPage;
