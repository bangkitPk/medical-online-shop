// src/features/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  filterProducts,
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
    filteredProducts: {
      category: null,
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
        category: null,
        lastDocId: null,
        total: 0,
        items: [],
      };
    },
    clearFilterStates(state) {
      state.filteredProducts = {
        category: null,
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
        console.log("Total produk semua: " + state.totalProducts);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, ...action.payload.products];
        state.lastDocId = action.payload.lastDocId;
        console.log(state.items);
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
        state.searchedProducts.items = [
          ...state.searchedProducts.items,
          ...action.payload.items,
        ];
        state.searchedProducts.lastDocId = action.payload.lastDocId;
        state.searchedProducts.total = action.payload.total;
        console.log("Total produk yg dicari: " + state.searchedProducts.total);
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredProducts.items = [
          ...state.filteredProducts.items,
          ...action.payload.items,
        ];
        state.filteredProducts.lastDocId = action.payload.lastDocId;
        state.filteredProducts.total = action.payload.total;
        state.filteredProducts.category = action.payload.category;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllProducts, clearSearchStates, clearFilterStates } =
  productSlice.actions;
export default productSlice.reducer;
