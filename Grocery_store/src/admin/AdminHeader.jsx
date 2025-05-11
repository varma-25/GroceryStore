import React from "react";

const AdminHeader = ({ onLogout }) => {
  return (
    <div className="admin-header">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
