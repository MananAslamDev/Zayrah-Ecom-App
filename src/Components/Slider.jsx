import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://zayrah-backend.onrender.com/api/women-clothes");
        const productData = response.data.slice(0, 10).map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        }));
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const swiperSettings = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 20,
    slidesPerView: 3,
    navigation: true,
    pagination: { clickable: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    touchRatio: 1,
    className: "pb-10",
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-4 text-gray-700">No products available</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 text-center">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
        <span className="border-b-4 border-maroon-700 pb-1">Featured</span>{" "}
        <span>Traditional Dresses</span>
      </h2>
      <Swiper {...swiperSettings}>
        {products.map((product) => (
          <SwiperSlide key={product.id} className="p-5">
            <div className="bg-white text-gray-900 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 p-5 h-[400px] flex flex-col">
              <img
                className="w-[200px] h-[300px] object-cover rounded-md mb-3 mx-auto transform transition duration-500 hover:scale-105"
                src={product.image || "https://via.placeholder.com/200x300"}
                alt={product.name}
              />
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-maroon-700">Rs. {product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;