import { Search, ShoppingCart, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBannerNoBg from "/HeaderBannerNoBg.png";

export default function Header() {
  const navigate = useNavigate();

  // 🔹 Static mock cart items
  const cartItems = [];
  const cartItemCount = 0;

  // 🔹 Static mock notifications
  const mockNotifications = [
    { id: 1, message: "New discount on bridal wear!", time: "2h ago" },
    { id: 2, message: "Your order #Z1234 has shipped", time: "5h ago" },
    { id: 3, message: "Zayrah Eid Collection is live!", time: "1d ago" },
    { id: 4, message: "New arrivals in Accessories", time: "2d ago" },
    { id: 5, message: "Flat 20% off on all kurtis!", time: "3d ago" },
  ];

  const goToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = () => {
    navigate("/cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-sm relative w-auto top-0 z-30">
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
                className="object-contain h-10 w-auto"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Zayrah styles, bridal, accessories..."
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
            {/* Cart */}
            <div className="p-1 relative" onClick={handleCartClick} style={{ cursor: "pointer" }}>
              <ShoppingCart className="text-gray-700" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4b0d0d] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Notifications with dropdown */}
            <div className="relative group p-1 cursor-pointer">
              <Bell className="text-gray-700 hover:text-[#4b0d0d] transition-colors duration-200" size={20} />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg animate-pulse">
                {mockNotifications.length}
              </span>
              
              {/* Enhanced Notifications Dropdown */}
              <div className="absolute top-8 right-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-red-100/50 p-0 hidden group-hover:block z-50 transform opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-950 to-red-900 px-4 py-3 rounded-t-2xl">
                  <h3 className="text-white font-semibold text-sm flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="bg-amber-400 text-red-900 text-xs px-2 py-1 rounded-full font-bold">
                      {mockNotifications.length}
                    </span>
                  </h3>
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.slice(0, 4).map((notification, index) => (
                    <div 
                      key={notification.id} 
                      className="px-4 py-3 border-b border-red-50 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-amber-50/30 transition-all duration-200 cursor-pointer group/item"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover/item:text-red-900 transition-colors duration-200">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <span className="opacity-60">{notification.time}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 bg-gradient-to-r from-red-50/50 to-amber-50/30 rounded-b-2xl border-t border-red-100/50">
                  <button className="w-full text-center text-sm font-semibold text-red-800 hover:text-red-900 hover:bg-white/50 py-2 px-3 rounded-xl transition-all duration-200 hover:shadow-sm">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>

            {/* User */}
            <Link to="/profile" className="p-1">
              <User className="text-gray-700" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}