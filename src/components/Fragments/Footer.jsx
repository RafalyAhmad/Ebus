import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white p-4 shadow flex justify-around">
      <Link to="/" className="text-gray-500 inline-flex flex-col items-center">
        <span>🏠</span>
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/product"
        className="text-gray-500 inline-flex flex-col items-center"
      >
        <span>💼</span>
        <span className="text-xs">Product</span>
      </Link>
      <Link
        to="/cart"
        className="text-gray-500 inline-flex flex-col items-center"
      >
        <span>🛒</span>
        <span className="text-xs">Cart</span>
      </Link>
      <Link
        to="/review"
        className="text-gray-500 inline-flex flex-col items-center"
      >
        <span>📖</span>
        <span className="text-xs">Review</span>
      </Link>
      <Link
        to="/profil"
        className="text-gray-500 inline-flex flex-col items-center"
      >
        <span>👤</span>
        <span className="text-xs">Profile</span>
      </Link>
    </footer>
  );
};

export default Footer;
