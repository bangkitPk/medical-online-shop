// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
  removeFromCart,
} from "../thunks/cartThunk";

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    // totalBiaya: 0,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // case get cart data
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.cartProducts;
        state.totalBiaya += action.payload.cartTotalBiaya;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // case untuk menambah produk ke cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        // state.totalBiaya += action.payload.totalBiaya;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // case untuk remove product from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.product.id
        );
        state.totalBiaya -= action.payload.totalBiaya;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // case tambah jumlah produk
      .addCase(increaseQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // case mengurangi jumlah produk
      .addCase(decreaseQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
