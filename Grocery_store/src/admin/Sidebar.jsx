import React from "react";
import "./admin.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={() => setActivePage("products")}>Manage Products</li>
        <li onClick={() => setActivePage("orders")}>Manage Orders</li>
        <li onClick={() => setActivePage("users")}>Manage Users</li>
      </ul>
    </div>
  );
};

export default Sidebar;
