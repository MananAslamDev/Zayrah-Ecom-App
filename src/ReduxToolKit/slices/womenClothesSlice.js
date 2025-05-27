// src/slices/womenClothesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchWomenClothes = createAsyncThunk(
  "womenClothes/fetchAll",
  async (_, thunkAPI) => {
    toast.info("Loading women’s clothing...", { toastId: "women-clothes-loading" });
    try {
      const response = await axios.get("https://zayrah-backend.onrender.com/api/women-clothes");
      toast.success("Women’s clothing loaded!", { toastId: "women-clothes-success" });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch women’s clothing.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const womenClothesSlice = createSlice({
  name: "womenClothes",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomenClothes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWomenClothes.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchWomenClothes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default womenClothesSlice.reducer;
