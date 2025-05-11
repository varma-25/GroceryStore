import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import "./admin.css";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("products");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Uncomment the following code to enforce role-based access control
    /* if (!token || role !== "admin") {
      alert("Access Denied! Admins only.");
      navigate("/login");
    } */
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear localStorage (logout)
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // Redirect to login page
      navigate("/login");
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <ManageProducts />;
      case "orders":
        return <ManageOrders />;
      case "users":
        return <ManageUsers />;
      default:
        return <ManageProducts />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActivePage={setActivePage} />
      <div className="admin-content">
        <AdminHeader onLogout={handleLogout} />
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
