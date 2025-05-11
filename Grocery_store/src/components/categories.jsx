import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./component.css";
import fruits from "../assets/fruits.png";
import vegetables from "../assets/vegetables.png";
import meat from "../assets/meat.png";
import dairy from "../assets/dairy.png";
import snacks from "../assets/snacks.png";
import drinks from "../assets/drinks.png";
import condiments from "../assets/condiments.png";
import grains from "../assets/grains.png";
import oils from "../assets/oils.png";
import tea from "../assets/tea.png";

const categories = [
  { name: "Fruits", image: fruits, link: "/fruits" },
  { name: "Vegetables", image: vegetables, link: "/vegetables" },
  { name: "Meat", image: meat, link: "/meat" },
  { name: "Dairy & Eggs", image: dairy, link: "/dairy-eggs" },
  { name: "Oils & Fats", image: oils, link: "/oils-fats" },
  { name: "Drinks", image: drinks, link: "/drinks" },
  { name: "Condiments", image: condiments, link: "/condiments" },
  { name: "Grains", image: grains, link: "/grains" },
  { name: "Tea & Coffee", image: tea, link: "/tea-coffee" },
  { name: "Snacks", image: snacks, link: "/snacks" },
];

const Categories = () => {
  return (
    <div className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="category-item"
            style={{ textDecoration: "none", color: "black" }} // Ensures text stays black
          >
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
