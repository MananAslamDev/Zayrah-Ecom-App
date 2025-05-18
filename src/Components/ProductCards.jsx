import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAudioProducts } from "../Redux/actions/ProductActions";

const ProductCards = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: products,
    error,
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAudioProducts());
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="border-b-4 border-[#4b0d0d] pb-1">Our Top</span>{" "}
        <span>Products</span>
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.products?.map((product) => (
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
    </div>
  );
};

export default ProductCards;
