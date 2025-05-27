import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UNSPLASH_ACCESS_KEY = "DAOARPnuKHIs1PPXsV2LukRCP_6laYKIoSHhaOSl3y4";

const WomenClothingCards = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: {
            query: "traditional-maroon-clothes", // Updated query
            per_page: 10,
            orientation: "landscape",
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        const bannerData = response.data.results.map((photo) => ({
          url: photo.urls.regular,
          alt: photo.alt_description || `Traditional Pakistani Women Dress ${photo.id}`,
        }));
        setBanners(bannerData);
      } catch (err) {
        setError(err.response?.data?.errors?.[0] || err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchBanners();
      setLoading(false);
    };

    fetchData();
  }, []);

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
          arrows: false,
          dots: true,
        },
      },
    ],
  };


  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (banners.length === 0) {
    return <div className="text-center py-4">No banners available</div>;
  }

  return (
    <div className="p-6">
      <div className="w-full max-w-7xl mx-auto">
        <Slider{...settings}>
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