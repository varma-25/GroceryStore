import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import tea from "../assets/tea1.png";
import green from "../assets/greent.png";
import coffee from "../assets/coffee.png";
import coffee2 from "../assets/coffee2.png";

const tcProducts = [
  { name: "Brooke Bond Taj Mahal Rich & Flavourful Tea", quantity: "1 Kg", price: 250, image: tea },
  { name: "Tetley Lemon & Honey Green Tea Bags", quantity: "1 Kg", price: 600, image: green },
  { name: "Bru Instant Coffee 50 g", quantity: "1 Kg", price: 300, image: coffee },
  { name: "Continental Malgudi Fresh 80 Degree Filter Coffee", quantity: "1 Kg", price: 300, image: coffee2 },
];

const TcPage = () => {
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
      <h2 className="page-title">Tea & Coffee</h2>
      <div className="product-list">
        {tcProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="quantity">{product.quantity}</p>
              <div className="price">
                <span className="new-price">₹{product.price}</span>
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

export default TcPage;
