import React, { useState, useEffect } from "react";
import "./component.css";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${showFooter ? "visible" : ""}`}>
      <div className="footer-content">
        <div className="footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-categories">
          <h3>Categories</h3>
          <ul>
            <li>Vegetables & Fruits</li>
            <li>Cold Drinks & Juices</li>
            <li>Bakery & Biscuits</li>
            <li>Snacks & Munchies</li>
            <li>Dairy & Breakfast</li>
            <li>Personal Care</li>
          </ul>
        </div>
        <div className="footer-download">
          <h3>Download App</h3>
          <div className="app-icons">
            <img src="appstore.png" alt="App Store" />
            <img src="playstore.png" alt="Google Play" />
          </div>
        </div>
      </div>
      <p className="footer-bottom">
        © Eco Market Private Limited, 2025
      </p>
    </footer>
  );
};

export default Footer;
