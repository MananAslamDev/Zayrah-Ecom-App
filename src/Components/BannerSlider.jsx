import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UNSPLASH_ACCESS_KEY = 'DAOARPnuKHIs1PPXsV2LukRCP_6laYKIoSHhaOSl3y4';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'headphones, gaming',
            per_page: 10,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        const bannerData = response.data.results.map((photo) => ({
          url: photo.urls.regular,
          alt: photo.alt_description || `Banner ${photo.id}`,
        }));
        setBanners(bannerData);
      } catch (err) {
        setError(err.response?.data?.errors?.[0] || err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.in/api/products/category?type=audio');
        const productData = response.data.products.slice(0, 3).map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
        }));
        setProducts(productData);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBanners(), fetchProducts()]);
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
    arrows: false,
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

  if (banners.length === 0 || products.length === 0) {
    return <div className="text-center py-4">No data available</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-4 flex flex-col md:flex-row gap-1">
      <div className="w-full md:w-2/3 px-4 md:px-2">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="px-2">
              <img
                src={banner.url}
                alt={banner.alt}
                className="w-full h-[300px] object-cover rounded-lg shadow-lg md:h-[400px] sm:w"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full md:w-1/3 grid-cols-2 gap-4 px-5 hidden md:hidden lg:grid">
        {products.length > 0 && (
          <>
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
                <img
                  src={products[0].image}
                  alt={products[0].title}
                  className="w-full h-[150px] object-contain mb-2"
                />
                <h3 className="text-sm font-semibold truncate">{products[0].title}</h3>
                <p className="text-lg font-bold">${products[0].price}</p>
              </div>
            </div>
            {products.slice(1, 3).map((product) => (
              <div key={product.id} className="col-span-1">
                <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[100px] object-contain mb-2"
                  />
                  <h3 className="text-sm font-semibold truncate">{product.title}</h3>
                  <p className="text-lg font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;