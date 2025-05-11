import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to cart
import "./component.css";
import Atta from "../assets/a1.png";
import Rice from "../assets/brice.png";
import Milk1 from "../assets/milk1.png";
import Milk2 from "../assets/milk2.png";
import Curd1 from "../assets/curd1.png";
import Curd2 from "../assets/curd2.png";

const products = [
  { name: "Aashirvaad MP Chakki Atta", quantity: "1 Kg", category: "Groceries", price: 39, oldPrice: 50, image: Atta },
  { name: "Daawat Traditional Basmati Rice", quantity: "1 Kg", category: "Groceries", price: 225, oldPrice: 250, image: Rice },
  { name: "Sangam Dairy Full Cream Milk", quantity: "500 ml", category: "Dairy", price: 32, oldPrice: 35, image: Milk1 },
  { name: "Sangam Dairy Toned Milk", quantity: "500 ml", category: "Dairy", price: 25, oldPrice: 28, image: Milk2 },
  { name: "Sangam Dairy Curd", quantity: "450 g", category: "Dairy", price: 30, oldPrice: 32, image: Curd1 },
  { name: "Sangam Dairy Thick & Tasty Curd", quantity: "1 Kg", category: "Dairy", price: 95, oldPrice: 105, image: Curd2 },
];

const StoreItems = () => {
  const [cartItems, setCartItems] = useState([]); // Track items in the cart
  const navigate = useNavigate();

  // Fetch cart items on component mount
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.map((item) => item.name)); // Store item names for quick lookup
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  const addToCart = (item) => {
    if (cartItems.includes(item.name)) {
      navigate("/cart"); // Redirect to cart if item is already added
      return;
    }

    const cartItem = {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
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
        setCartItems((prev) => [...prev, item.name]); // Update state
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  return (
    <div className="store-items">
      <h2>Trending Products</h2>
      <div className="items-list">
        {products.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p className="category">{item.category}</p>
              <h3>{item.name}</h3>
              <p className="quantity">{item.quantity}</p>
              <div className="price">
                <span className="new-price">₹{item.price}</span>
                {item.oldPrice && <span className="old-price">₹{item.oldPrice}</span>}
              </div>
              {/* Dynamic Add/View Cart Button */}
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                {cartItems.includes(item.name) ? "View Cart" : "Add to Cart"}
              </button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreItems;
