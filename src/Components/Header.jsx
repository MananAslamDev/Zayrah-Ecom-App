"use client";

import { Search, ShoppingCart, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderBannerNoBg from "/HeaderBannerNoBg.png";

export default function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const goToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = () => {
    navigate("/cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-30">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              className="logo-container"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={HeaderBannerNoBg}
                alt="Zayrah Logo"
                className="object-contain h-15 w-auto"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4b0d0d] focus:border-[#4b0d0d] text-sm"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-3">
            <div className="p-1 relative" onClick={handleCartClick} style={{ cursor: "pointer" }}>
              <ShoppingCart className="text-gray-700" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <Link to="/notifications" className="p-1 relative">
              <Bell className="text-gray-700" size={20} />
              <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </Link>
            <Link to="/profile" className="p-1">
              <User className="text-gray-700" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}