import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProductById = createAsyncThunk(
  "productDetails/fetchById",
  async (id, thunkAPI) => {
    toast.info("Fetching product details...", { toastId: "product-details-loading" });
    try {
      const response = await axios.get("https://zayrah-backend.onrender.com/api/women-clothes");
      const product = response.data.find((item) => item.id === id);
      if (!product) throw new Error("Product not found");
      toast.success("Product details loaded!", { toastId: "product-details-success" });
      return product;
    } catch (error) {
      toast.error("Failed to load product.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;