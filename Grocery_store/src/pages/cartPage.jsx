import React, { useEffect, useState } from "react";
import "./cartPage.css"; // Ensure this file exists for styling

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Items
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // Remove Item from Cart
  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  // Update Quantity in Cart (Increment & Decrement)
  const updateQuantity = (id, type) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, "dec")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, "inc")}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
