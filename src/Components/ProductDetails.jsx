// components/ProductDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../Redux/actions/SingleProductActions";
import { addToCart } from "../Redux/actions/CartActions";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product?.product) {
      dispatch(addToCart(product.product));
      toast.success(`${product.product.title?.slice(0, 10)}... added to cart!`);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product?.product) return <div className="text-center mt-10">Product not found</div>;

  // Destructure with safe access and slicing
  const { 
    title = "", 
    image, 
    price = 0, 
    description = "", 
    category = "N/A" 
  } = product.product || {};

  const truncatedTitle = title.length > 40 ? `${title.slice(0, 40)}...` : title;
  const truncatedDescription = description.length > 250 ? `${description.slice(0, 250)}...` : description;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {image && (
                <img
                  src={image}
                  alt={truncatedTitle}
                  className="w-full h-96 object-contain transform transition duration-500 hover:scale-105"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pl-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {truncatedTitle || "Product Title"}
            </h1>
            <p className="text-3xl font-bold text-[#4b0d0d] mb-6">
              ${price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {truncatedDescription || "Product description"}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#4b0d0d] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#502c2c] transition-colors duration-300"
            >
              Add to Cart
            </button>

            {/* Additional Details */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Product Specifications
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Category</span>
                  <span className="text-gray-900">{category}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Stock Status</span>
                  <span className="text-green-600">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;