import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", path: "/" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          {/* Logo Image */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" // Replace with your logo URL
            alt="Trilio Logo"
            className="w-8 h-8"
          />
          Trilio
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 rounded-md font-medium transition ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Sign In / Sign Up Buttons */}
          <Link
            to="/signin"
            className="px-4 py-2 rounded-md font-medium bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 font-medium transition ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Sign In / Sign Up Buttons for Mobile */}
          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 font-medium text-indigo-600 border border-indigo-600 rounded-md my-1 text-center hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 font-medium bg-indigo-600 text-white rounded-md my-1 text-center hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
