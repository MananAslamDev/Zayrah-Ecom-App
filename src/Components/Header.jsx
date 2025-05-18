import React from "react";
import HeaderBannerNoBg from "/HeaderBannerNoBg.png";
import { useNavigate } from "react-router-dom";

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
    <header className="h-22 px-10 py-2.5 flex flex-row items-center justify-between text-center border-b border-[#4bodod] rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.2)] box-border mt-[6px] overflow-y-hidden">
      <div
        className="logo-container"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={HeaderBannerNoBg}
          alt="Header Banner"
          className="h-65 w-44object-contain rounded"
        />
      </div>
    </header>
  );
};

export default Header;
