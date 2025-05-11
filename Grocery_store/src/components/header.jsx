import React from "react";
import { Link } from "react-router-dom";
import "./component.css";
import logo from "./logo.png"; // Ensure the image is inside src/components/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Fresh Cart Logo" className="logo-img" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Type to search..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {/* Navigation Menu */}
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/shop">Shop</Link></li>

          {/* Account Dropdown */}
          <li className="account-dropdown">
            <FontAwesomeIcon icon={faUser} className="account-icon" />
            <span>Account</span>
            <ul className="dropdown-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </li>

          {/* Cart Link */}
          <li>
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              <span className="cart-text">Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
