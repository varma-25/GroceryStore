import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./logsign.css";  // Import the updated CSS

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password recovery logic here
    console.log("Password reset for", email);
    alert("Password reset link sent to your email!");
    navigate("/login"); // Redirect to login page after sending the link
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
