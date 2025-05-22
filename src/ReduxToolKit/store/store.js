import { configureStore } from "@reduxjs/toolkit";
import productDetailsReducer from "../slices/productDetailsSlice";
import audioProductReducer from "../slices/audioProductSlice";
import cartReducer from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    audioProducts: audioProductReducer,
    cart: cartReducer,
  },
});

export default store;
