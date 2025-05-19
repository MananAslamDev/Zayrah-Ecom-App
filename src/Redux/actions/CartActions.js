export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});