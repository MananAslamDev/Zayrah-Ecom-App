import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWomenClothes } from "../ReduxToolKit/slices/womenClothesSlice";
import CategoryProductCards from "./CategoryProductCards";

const WomenClothingCards = () => {
  const dispatch = useDispatch();

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchWomenClothes());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <CategoryProductCards />
    </div>
  );
};

export default WomenClothingCards;