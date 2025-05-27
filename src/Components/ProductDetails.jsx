import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../ReduxToolKit/slices/productDetailsSlice";
import { addToCart } from "../ReduxToolKit/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, title: product.name })); // Map name to title for cart
      toast.success(`${product.name?.slice(0, 10)}... added to cart!`, {
        toastId: `cart-${product.id}`,
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!product || Object.keys(product).length === 0) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  // Destructure with safe access and defaults
  const {
    name = "",
    image = "/images/women/product001.jpg", // Default to sample image path
    price = 0,
    description = "No description available",
    category = "N/A",
    sizes = [],
    colors = [],
    material = "N/A",
    inStock = false,
  } = product;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={image}
                alt={name}
                className="w-full h-96 object-contain transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pl-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {name || "Product Name"}
            </h1>
            <p className="text-3xl font-bold text-maroon-700 mb-6">
              Rs. {price}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {description}
            </p>

            <button
              onClick={(e) => handleAddToCart(product, e)}
              className="flex items-center gap-2 text-white bg-[#4B0d0D] px-3 py-1 rounded-full hover:bg-maroon-700 transition duration-300"
            >
              <span className="text-sm font-medium">Add to Cart</span>
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
                  <span className="text-gray-900">
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Sizes</span>
                  <span className="text-gray-900">
                    {Array.isArray(sizes) && sizes.length > 0
                      ? sizes.join(", ")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Colors</span>
                  <span className="text-gray-900">
                    {Array.isArray(colors) && colors.length > 0
                      ? colors.join(", ")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Material</span>
                  <span className="text-gray-900">{material}</span>
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
