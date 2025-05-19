// Redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/CartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer, // Add cart reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;