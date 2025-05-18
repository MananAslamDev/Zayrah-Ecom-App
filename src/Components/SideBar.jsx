import { Home, ShoppingBag, ShoppingCart, Package, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ZayrahLogo from "/ZayrahLogo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-47 h-screen bg-[#4b0d0d] text-white flex flex-col p-4 fixed">
      <div
        className="logo-container"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={ZayrahLogo}
          alt="Header Logo"
          className="logo w-20 h-20 object-contain rounded"
        />
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
              isActive ? "bg-[#5e1a1a]" : ""
            }`
          }
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
              isActive ? "bg-[#5e1a1a]" : ""
            }`
          }
        >
          <ShoppingBag size={20} />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
              isActive ? "bg-[#5e1a1a]" : ""
            }`
          }
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
              isActive ? "bg-[#5e1a1a]" : ""
            }`
          }
        >
          <Package size={20} />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-[#5e1a1a] transition-colors ${
              isActive ? "bg-[#5e1a1a]" : ""
            }`
          }
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
