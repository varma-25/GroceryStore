import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import chips from "../assets/lays.png";
import biscuits from "../assets/kinder.png";
import namkeen from "../assets/kinderp.png";
import chocolate from "../assets/kitkat.png";

const snacksProducts = [
  { name: "Lay's West Indies Hot n Sweet Chilli Flavour Potato Chips", quantity: "52 g", price: 30, oldPrice: 35, image: chips },
  { name: "Kinder Joy (Blue)", quantity: "800 g", price: 80, oldPrice: 90, image: biscuits },
  { name: "Kinder Joy (Pink)", quantity: "400 g", price: 150, oldPrice: 170, image: namkeen },
  { name: "Nestle KitKat Love Break, 4 Fingers Wafer Chocolate Bar", quantity: "150 g", price: 180, oldPrice: 200, image: chocolate },
];

const SnacksPage = () => {
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
      <h2 className="page-title">Snacks</h2>
      <div className="product-list">
        {snacksProducts.map((product, index) => (
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

export default SnacksPage;
