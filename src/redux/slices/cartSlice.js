// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCart, removeFromCart } from "../thunks/cartThunk";

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalBiaya: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    increaseQuantity(state, action) {
      const { productId } = action.payload;

      // cari produk
      const existingProduct = state.products.find(
        (product) => product.id === productId
      );

      // jika produk ada, update jjumlah
      if (existingProduct) {
        existingProduct.jumlah += 1;
        existingProduct.total += existingProduct.harga;
        state.totalBiaya += existingProduct.harga;
      }
    },
    decreaseQuantity(state, action) {
      const { productId } = action.payload;

      // cari produk
      const existingProduct = state.products.find(
        (product) => product.id === productId
      );

      // jika produk ada, update jjumlah
      if (existingProduct && existingProduct.jumlah > 1) {
        existingProduct.jumlah -= 1;
        existingProduct.total -= existingProduct.harga;
        state.totalBiaya -= existingProduct.harga;
      }
    },
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
        console.log("State pertama: ");
        console.log(state.products);
        console.log(state.totalBiaya);
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
        const productToAdd = action.payload;

        state.isLoading = false;
        state.products = [...state.products, productToAdd];
        state.totalBiaya += productToAdd.total;
        console.log("State updated:");
        console.log(state.products);
        console.log(state.totalBiaya);
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
        state.totalBiaya = action.payload.totalBiaya;
        console.log("State updated:");
        console.log(state.products);
        console.log(state.totalBiaya);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // case tambah jumlah produk
    // .addCase(increaseQuantity.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(increaseQuantity.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.products = action.payload;
    // })
    // .addCase(increaseQuantity.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // })

    // case mengurangi jumlah produk
    // .addCase(decreaseQuantity.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(decreaseQuantity.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.products = action.payload;
    // })
    // .addCase(decreaseQuantity.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
