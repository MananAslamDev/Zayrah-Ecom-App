const initialState = {
  loading: false,
  product: {},
  error: null,
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload, error: null };
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
};