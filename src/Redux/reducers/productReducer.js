const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REQUESTED':
        return { ...state, loading: true };
      case 'SUCCESSFUL':
        return { loading: false, data: action.payload, error: null };
      case 'FAILURE':
        return { loading: false, data: [], error: action.payload };
      default:
        return state;
    }
  };