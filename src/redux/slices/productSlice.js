// src/features/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  getTotalProducts,
  searchProducts,
} from "../thunks/productThunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    lastDocId: null,
    totalProducts: 0,
    searchedProducts: {
      lastDocId: null,
      total: 0,
      items: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAllProducts(state) {
      state.items = [];
      state.lastDocId = null;
      state.searchedProducts = {
        lastDoc: null,
        total: 0,
        items: [],
      };
      state.error = null;
      state.isLoading = false;
    },
    clearSearchStates(state) {
      state.searchedProducts = {
        lastDocId: null,
        total: 0,
        items: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProducts.fulfilled, (state, action) => {
        state.totalProducts = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, ...action.payload.products];
        state.lastDocId = action.payload.lastDocId;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // search product actions
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedProducts.items = action.payload.items;
        state.searchedProducts.lastDocId = action.payload.lastDoc;
        state.searchedProducts.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllProducts, clearSearchStates } = productSlice.actions;
export default productSlice.reducer;
