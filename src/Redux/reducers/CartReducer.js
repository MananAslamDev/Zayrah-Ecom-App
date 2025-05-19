import { ADD_TO_CART, UPDATE_QUANTITY, REMOVE_FROM_CART } from "../actions/CartActions";

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
};