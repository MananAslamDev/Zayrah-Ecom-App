import axios from "axios";
import { toast } from "react-toastify";

export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
  toast.info('Fetching product details...', { toastId: 'product-details-loading' });
  try {
    const response = await axios.get(`https://fakestoreapi.in/api/products/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: response.data });
    toast.success('Product details loaded successfully!', { toastId: 'product-details-success' });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
    toast.error(`Failed to load product: ${error.message}`);
  }
};