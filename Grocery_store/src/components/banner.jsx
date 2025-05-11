import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./component.css";
import B1 from "../assets/mb.png"; // Fruits
import B2 from "../assets/mb2.png"; // Vegetables
import B3 from "../assets/b3.png"; // Drinks

const images = [B1, B2, B3];
const routes = ["/fruits", "/vegetables", "/drinks"]; // Routes for each image

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // Navigate to respective pages
  const handleImageClick = (index) => {
    navigate(routes[index]);
  };

  return (
    <div className="banner">
      <div className="carousel">
        {/* Left Image */}
        <div className="image-wrapper left">
          <img
            src={images[prevIndex]}
            alt="Previous Banner"
            className="side-banner-img"
            onClick={() => handleImageClick(prevIndex)}
          />
        </div>

        {/* Main Image */}
        <div className="image-wrapper center">
          <img
            src={images[currentIndex]}
            alt="Main Banner"
            className="main-banner-img"
            onClick={() => handleImageClick(currentIndex)}
          />
        </div>

        {/* Right Image */}
        <div className="image-wrapper right">
          <img
            src={images[nextIndex]}
            alt="Next Banner"
            className="side-banner-img"
            onClick={() => handleImageClick(nextIndex)}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
