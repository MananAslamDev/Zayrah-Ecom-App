import axios from "axios";
import { toast } from "react-toastify";

export const fetchAudioProducts = () => async (dispatch) => {
  dispatch({ type: "REQUESTED" });
  toast.info("Fetching products...", { toastId: "products-loading" });
  try {
    const response = await axios.get(
      "https://fakestoreapi.in/api/products/category?type=audio"
    );
    dispatch({ type: "SUCCESSFUL", payload: response.data });
    toast.success("Audio products loaded successfully!", {
      toastId: "products-success",
    });
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error.message });
    toast.error(`Failed to load products: ${error.message}`, {
      toastId: "products-error",
    });
  }
};