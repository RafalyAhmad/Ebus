import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const Footer = () => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated(); // Check login status

  const allNavItems = [
    { to: "/", icon: "🏠", label: "Home" },
    { to: "/product", icon: "📦", label: "Produk" },
    { to: "/cart", icon: "🛒", label: "Keranjang" },
    { to: "/review", icon: "✨", label: "Ulasan" },
    { to: "/profil", icon: "👤", label: "Profil" },
  ];

  const navItemsToShow = isLoggedIn
    ? allNavItems
    : [{ to: "/", icon: "🏠", label: "Home" }];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {navItemsToShow.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200
                ${
                  location.pathname === item.to
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
              <span className="text-xs sm:text-sm mt-1 font-medium hidden sm:block">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
