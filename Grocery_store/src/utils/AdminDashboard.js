import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchWithAuth("/admin/products");
      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
