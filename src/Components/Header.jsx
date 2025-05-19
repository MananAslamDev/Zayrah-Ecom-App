"use client";

import { useState } from "react";
import { Search, ShoppingCart, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);
  // Calculate total items (sum of quantities)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className={`relative ${searchOpen ? "flex-1" : "hidden md:block md:flex-1"}`}>
            <div className="relative max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4b0d0d] focus:border-[#4b0d0d]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Mobile search toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>

          {/* Navigation Icons */}
          <div className={`flex items-center space-x-5 ${searchOpen ? "hidden" : "flex"}`}>
            <Link to="/cart" className="p-1 relative">
              <ShoppingCart className="text-gray-700" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/notifications" className="p-1 relative">
              <Bell className="text-gray-700" size={22} />
              <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </Link>
            <Link to="/profile" className="p-1">
              <User className="text-gray-700" size={22} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}