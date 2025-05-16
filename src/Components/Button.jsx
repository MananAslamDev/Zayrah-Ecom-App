import React from "react";

const Button = ({
  text,
  onClick,
  type = "button",
  className = "",
  variant = "default",
}) => {
  const baseStyles =
    "w-fit h-[50px] font-poppins font-medium px-5 rounded-lg inline-flex items-center justify-center cursor-pointer border transition-all duration-300";

  const variants = {
    default:
      "bg-[linear-gradient(90deg,_#4b0d0d,_#4b0d0d)] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-500 ease-in-out text-white border-none",
    outline:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;
