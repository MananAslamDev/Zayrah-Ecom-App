import { configureStore } from "@reduxjs/toolkit";
import productDetailsReducer from "../slices/productDetailsSlice";
import audioProductReducer from "../slices/audioProductSlice";
import cartReducer from "../slices/cartSlice";
import womenClothesReducer from "../slices/womenClothesSlice";

const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    audioProducts: audioProductReducer,
    cart: cartReducer,
    womenClothes: womenClothesReducer,
  },
});

export default store;
