import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image imports from public folder (Vite)
import Banner01 from "/images/Banner/Banner01.png";
import Banner02 from "/images/Banner/Banner02.png";
import Banner03 from "/images/Banner/Banner03.png";
import Banner04 from "/images/Banner/Banner04.png";
import Banner05 from "/images/Banner/Banner05.png";
import Banner06 from "/images/Banner/Banner06.png";
import Banner07 from "/images/Banner/Banner07.png";
import Banner08 from "/images/Banner/Banner08.png";
import Banner09 from "/images/Banner/Banner09.png";
import Banner10 from "/images/Banner/Banner10.png";

const banners = [
  { url: Banner01, alt: "Maroon Eastern Embroidered Suit" },
  { url: Banner02, alt: "Western Navy Blue Maxi Dress" },
  { url: Banner03, alt: "Bridal Royal Blue Lehenga" },
  { url: Banner04, alt: "Eastern Pink Lawn Suit" },
  { url: Banner05, alt: "Western Coral Midi Dress" },
  { url: Banner06, alt: "Bridal Maroon Velvet Lehenga" },
  { url: Banner07, alt: "Eastern Olive Green Suit" },
  { url: Banner08, alt: "Western Teal Off-Shoulder Dress" },
  { url: Banner09, alt: "Bridal Ivory Silk Lehenga" },
  { url: Banner10, alt: "Eastern Cream Embroidered Suit" },
];

const WomenClothingCards = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    touchRatio: 1,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      {/* Banner Slider */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="px-2">
              <img
                src={banner.url}
                alt={banner.alt}
                className="w-full h-[300px] object-cover rounded-lg shadow-lg md:h-[400px]"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default WomenClothingCards;
