// Redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import { productDetailsReducer } from "./reducers/SingleProductReducer";
import { cartReducer } from "./reducers/CartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;