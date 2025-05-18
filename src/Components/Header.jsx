// Header.jsx
import React from "react";
import HeaderBannerNoBg from "/HeaderBannerNoBg.png";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="h-20 px-6 py-2 flex items-center justify-between border-b border-[#4b0d0d]/20 bg-white shadow-sm sticky top-0 z-10 rounded">
      <div
        className="logo-container"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={HeaderBannerNoBg}
          alt="Header Banner"
          className="h-16 w-auto object-contain" /* Fixed non-standard classes */
        />
      </div>

      {/* Search Bar - Optional */}
      <div className="hidden md:flex relative flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:border-[#4b0d0d] focus:ring-1 focus:ring-[#4b0d0d]"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Header Icons */}
      <div className="flex items-center gap-8">
        <button aria-label="Notifications" className="text-gray-700 hover:text-[#4b0d0d]">
          <Bell size={22} />
        </button>
        <button 
          aria-label="Cart" 
          className="text-gray-700 hover:text-[#4b0d0d] relative"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </button>
        <button 
          aria-label="Profile" 
          className="text-gray-700 hover:text-[#4b0d0d]"
          onClick={() => navigate("/profile")}
        >
          <User size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;