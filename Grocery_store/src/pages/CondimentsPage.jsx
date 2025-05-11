import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart page
import "./page.css";
import salt from "../assets/salt.png"; 
import chilliPowder from "../assets/chillip.png"; 
import ketchup from "../assets/ketchup.png"; 
import blackPepper from "../assets/pepper.png"; 

const condimentsProducts = [
  { name: "Aashirvaad Iodized Natural Salt", quantity: "1 Kg", price: 25, oldPrice: 30, image: salt },
  { name: "Everest Kashmiri Red Chilli Powder", quantity: "100 g", price: 60, oldPrice: 75, image: chilliPowder },
  { name: "Kissan Fresh Tomato Ketchup", quantity: "1 Kg", price: 120, oldPrice: 150, image: ketchup },
  { name: "Orika Black Pepper Powder", quantity: "100 g", price: 90, oldPrice: 100, image: blackPepper },
];

const CondimentsPage = () => {
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
      <h2 className="page-title">Condiments</h2>
      <div className="product-list">
        {condimentsProducts.map((product, index) => (
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

export default CondimentsPage;
