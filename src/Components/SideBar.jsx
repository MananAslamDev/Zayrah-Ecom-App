import React, { useState, useEffect } from "react";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Package,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ZayrahLogo from "/ZayrahLogo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const goToHome = () => {
    navigate("/");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-[#4b0d0d] text-white p-2 rounded-full shadow-lg"
        onClick={toggleMobileSidebar}
        aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-100 z-40"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <div
        className={`h-screen bg-[#4b0d0d] text-white flex flex-col fixed transition-all duration-300 z-40
          ${collapsed && !mobileOpen ? "w-20" : "w-64 md:w-54"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between p-4">
          {/* Logo on the right */}
          <div
            className="logo-container flex items-center md:order-2"
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          >
            <img
              src={ZayrahLogo}
              alt="Zayrah Logo"
              className={`object-contain rounded ${
                collapsed && !mobileOpen ? "w-12 h-12" : "w-20 h-20"
              }`}
            />
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-6 px-2">
          {[
            { to: "/", icon: Home, label: "Home" },
            { to: "/products", icon: ShoppingBag, label: "Products" },
            { to: "/cart", icon: ShoppingCart, label: "Cart" },
            { to: "/orders", icon: Package, label: "Orders" },
            { to: "/profile", icon: User, label: "Profile" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
                  isActive ? "bg-[#5e1a1a]" : ""
                } ${collapsed && !mobileOpen ? "justify-center" : ""}`
              }
              title={item.label}
              onClick={() => {
                setMobileOpen(false);
                setCollapsed(true);
              }}
            >
              <item.icon size={20} />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Chevron Toggle Button - Centered after navbar */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <button
            className="text-white hover:bg-[#5e1a1a] p-2 rounded-full"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;