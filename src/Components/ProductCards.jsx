import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAudioProducts } from "../ReduxToolKit/slices/audioProductSlice";
import { addToCart } from "../ReduxToolKit/slices/cartSlice"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; 

const ProductCards = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.audioProducts);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  // Reference to the component's top
  const componentRef = useRef(null);

  // Update products per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setProductsPerPage(8); // Mobile view: 8 products per page
      } else {
        setProductsPerPage(12); // Desktop view: 12 products per page
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchAudioProducts());
  }, [dispatch]);
  
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  // Use products.products (the inner array) and ensure it's an array
  const productList = Array.isArray(products?.products) ? products.products : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalProducts = productList.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title.slice(0, 10)}... added to cart!`, {
      toastId: `cart-${product.id}`,
    });
  };

  const handleProductClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const scrollToComponentTop = () => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToComponentTop();
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToComponentTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToComponentTop();
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div ref={componentRef} className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="border-b-4 border-[#4b0d0d] pb-1">Our Top</span>{" "}
        <span>Products</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link
            onClick={handleProductClick}
            to={`/product/${product.id}`} 
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
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
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="bg-[#4B0d0D] text-white px-3 py-1 rounded hover:bg-[#502c2c]"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {currentProducts.length === 0 && !loading && (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}

      {totalProducts > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex flex-wrap items-center justify-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4B0d0D] text-white hover:bg-[#502c2c]"
              }`}
            >
              « Prev
            </button>

            <div className="flex flex-wrap mx-2 justify-center">
              {getPageNumbers().map((number, index) =>
                number === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1 mx-1">
                    ...
                  </span>
                ) : (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 mx-1 rounded ${
                      currentPage === number
                        ? "bg-[#4B0d0D] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4B0d0D] text-white hover:bg-[#502c2c]"
              }`}
            >
              Next »
            </button>
          </nav>
        </div>
      )}

      <div className="text-center text-gray-600 mt-4">
        Showing {totalProducts > 0 ? indexOfFirstProduct + 1 : 0}-
        {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}{" "}
        products
      </div>
    </div>
  );
};

export default ProductCards;
