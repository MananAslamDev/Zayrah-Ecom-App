import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAudioProducts } from "../Redux/actions/ProductActions";

const ProductCards = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: products,
    error,
  } = useSelector((state) => state.products);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    dispatch(fetchAudioProducts());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  
  // Calculate total pages
  const totalProducts = products.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="border-b-4 border-[#4b0d0d] pb-1">Our Top</span>{" "}
        <span>Products</span>
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-3"
            />
            <h2 className="font-semibold text-lg truncate">{product.title}</h2>
            <p className="text-gray-500 text-sm">
              {product.description.slice(0, 60)}...
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-[#4b0d0d] font-bold">${product.price}</span>
              <button className="bg-[#4B0d0D] text-white px-3 py-1 rounded hover:bg-[#502c2c]">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalProducts > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center">
            {/* Previous button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4B0d0D] text-white hover:bg-[#502c2c]"
              }`}
            >
              &laquo; Prev
            </button>
            
            {/* Page numbers */}
            <div className="flex mx-2">
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === number + 1
                      ? "bg-[#4B0d0D] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
            
            {/* Next button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4B0d0D] text-white hover:bg-[#502c2c]"
              }`}
            >
              Next &raquo;
            </button>
          </nav>
        </div>
      )}
      
      {/* Showing results info */}
      <div className="text-center text-gray-600 mt-4">
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} products
      </div>
    </div>
  );
};

export default ProductCards;