import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";

const MainNavbar = ({ activePage, setActivePage, user }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: "Dashboard" },
    { name: "Tasks" },
    { name: "Calendar" },
    { name: "Timer" },
    { name: "Reports" },
    { name: "Teams" },
  ];

  const handleNavClick = (item) => {
    setActivePage(item);
    navigate(`/${item.toLowerCase()}`);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Redirect to landing page "/"
      signOut(() => navigate("/"));
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
        <span className="text-xl font-bold text-indigo-600">TRILO</span>
      </div>

      {/* Navbar */}
      <nav className="flex gap-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            className={`px-3 py-1 rounded-lg text-gray-700 hover:bg-indigo-100 transition ${
              activePage === item.name ? "bg-indigo-100 font-semibold" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* User logout */}
        <button
          onClick={handleLogout}
          className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-semibold hover:bg-indigo-700 transition"
        >
          <FiUser />
        </button>
      </div>
    </header>
  );
};

export default MainNavbar;
