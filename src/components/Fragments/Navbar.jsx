import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchProvider";
import { isAuthenticated, logoutUser, getCurrentUser } from "../../utils/auth"; // Import auth utilities

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setCurrentUser(getCurrentUser());
  }, []); // Empty dependency array means this runs once on mount

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search submitted:", searchTerm);
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate("/login"); // Redirect to login page after logout
    } else {
      console.error("Logout failed:", result.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pb-2">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-4xl font-extrabold tracking-wider">
            Sub<span className="text-blue-200">X</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="hidden md:block text-lg font-medium hover:text-blue-200 transition duration-300"
            >
              Produk
            </Link>
            <Link
              to="/cart"
              className="hidden md:block text-lg font-medium hover:text-blue-200 transition duration-300"
            >
              Keranjang
            </Link>

            {/* Conditional rendering based on login status */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300 shadow"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-400 transition duration-300 shadow"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <>
                {/* User Profile/Name when logged in */}
                <Link
                  to="/profil" // Assuming you have a profile page
                  className="hidden md:block text-lg font-medium hover:text-blue-200 transition duration-300"
                >
                  Halo, {currentUser?.name || "Pengguna"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition duration-300 shadow"
                >
                  Logout
                </button>
              </>
            )}

            {/* Profile Icon (always visible or adjust visibility) */}
            <Link
              to="/profil"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </Link>

            {/* Cart Icon (if not using a separate Cart link, or for mobile) */}
            <Link
              to="/cart"
              className="text-white hover:text-blue-200 transition duration-300 md:hidden"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </Link>

            {/* More Menu (e.g., Hamburger icon for mobile, or a dropdown for other links) */}
            <button className="text-white hover:text-blue-200 transition duration-300">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative mt-4">
          <div className="relative w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
              placeholder="Cari layanan, produk, atau promo..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Cari"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
