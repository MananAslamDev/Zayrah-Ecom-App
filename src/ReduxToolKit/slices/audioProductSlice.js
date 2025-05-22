// src/slices/audioProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchAudioProducts = createAsyncThunk(
  "audioProducts/fetchAll",
  async (_, thunkAPI) => {
    toast.info("Fetching audio products...", { toastId: "audio-products-loading" });
    try {
      const response = await axios.get(
        "https://fakestoreapi.in/api/products/category?type=audio"
      );
      toast.success("Audio products loaded!", { toastId: "audio-products-success" });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch audio products.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const audioProductSlice = createSlice({
  name: "audioProducts",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudioProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAudioProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAudioProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default audioProductSlice.reducer;
