import React from "react";

const GroceryItem = ({ item }) => {
  const addToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1, // Default quantity
        }),
      });

      if (response.ok) {
        alert("Item added to cart successfully!");
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default GroceryItem;
