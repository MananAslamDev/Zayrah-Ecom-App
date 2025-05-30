import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenClothes } from "../ReduxToolKit/slices/womenClothesSlice";
import { addToCart } from "../ReduxToolKit/slices/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CategoryProductCards = ({ initialCategory = "Eastern" }) => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.womenClothes
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const productsPerPage = 12; // 3 rows x 4 columns
  const componentRef = useRef(null);

  // Fixed categories from API data
  const categories = ["Eastern", "Western", "Bridal"];

  useEffect(() => {
    dispatch(fetchWomenClothes());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;

  // Filter products by the selected category
  const productList = Array.isArray(products)
    ? products.filter((product) => product.category === selectedCategory)
    : [];
  const pageCount = Math.ceil(productList.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = productList.slice(offset, offset + productsPerPage);

  const handleProductClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div ref={componentRef}>
      {/* Header with h1 and Tab Selector */}
      <div className="flex justify-end w-full">
        <div className="w-full md:w-[65%] flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          {/* Heading */}
          <div className="w-full text-center md:w-auto md:text-right">
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="border-b-4 border-maroon-700 pb-1">
                {selectedCategory}
              </span>{" "}
              <span>Clothing</span>
            </h1>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-start gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0);
                }}
                className={`px-5 py-2 rounded-lg shadow-md border border-gray-100 font-semibold text-sm transition duration-300 transform hover:scale-105 hover:shadow-xl ${
                  selectedCategory === category
                    ? "bg-[#4b0d0d] text-white border-maroon-700"
                    : "bg-white text-gray-800 hover:bg-maroon-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link
            onClick={handleProductClick}
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100"
          >
            <img
              src={product.image || "https://via.placeholder.com/300x400"}
              loading="lazy"
              alt={product.name}
              className="w-full h-[300px] object-contain lg:object-cover mb-3 rounded transform transition duration-500 hover:scale-105"
            />
            <h2 className="text-sm font-semibold text-gray-800 truncate mb-2">
              {product.name}
            </h2>
            <div className="flex items-center justify-between text-maroon-700 rounded mt-4">
              <p className="text-lg font-bold">Rs. {product.price}</p>
              <button
                className="flex items-center gap-2 text-white bg-[#4B0d0D] px-3 py-1 rounded-full hover:bg-maroon-700 transition duration-300"
              >
                <span className="text-sm font-medium">View Details</span>
              </button>
            </div>
          </Link>
        ))}
      </div>

      {currentProducts.length === 0 && !loading && (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">
            No products found for {selectedCategory}.
          </p>
        </div>
      )}

      {productList.length > productsPerPage && (
        <div className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel="« Prev"
            nextLabel="Next »"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="flex flex-wrap items-center justify-center gap-2"
            pageClassName="px-3 py-1 rounded"
            pageLinkClassName="text-gray-800 hover:bg-gray-300 rounded"
            activeClassName="bg-maroon-700 text-white"
            previousClassName="px-3 py-1 rounded"
            nextClassName="px-3 py-1 rounded"
            previousLinkClassName={
              currentPage === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed rounded"
                : "bg-maroon-700 text-white hover:bg-maroon-800 rounded"
            }
            nextLinkClassName={
              currentPage === pageCount - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed rounded"
                : "bg-maroon-700 text-white hover:bg-maroon-800 rounded"
            }
            breakClassName="px-3 py-1 text-gray-500"
            disabledClassName="cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryProductCards;
