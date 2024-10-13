// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCart,
} from "../thunks/cartThunk";

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    selectedProducts: [],
    totalBiaya: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCart(state) {
      state.products = [];
      state.selectedProducts = [];
      state.totalBiaya = 0;
      state.isLoading = false;
      state.error = null;
    },
    addToCart(state, action) {
      const { userId, product, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p.idProduk === product.id
      );

      if (existingProductIndex === -1) {
        const totalBiayaProduk = quantity * product.harga;
        const productToAdd = {
          idProduk: product.id,
          namaProduk: product.namaProduk,
          harga: product.harga,
          jumlah: quantity,
          total: totalBiayaProduk,
        };

        state.products = [...state.products, productToAdd];
        state.totalBiaya += totalBiayaProduk;
      }
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;

      // cari produk
      const existingProduct = state.products.find(
        (product) => product.id === productId
      );
      const productSelected = state.selectedProducts.find(
        (product) => product.id === productId
      );

      // jika produk ada, update jumlah
      if (existingProduct) {
        existingProduct.jumlah += 1;
        existingProduct.total += existingProduct.harga;
        if (productSelected) {
          // jika produk dipilih, update totalBiaya
          productSelected.jumlah += 1;
          productSelected.total += productSelected.harga;
          state.totalBiaya += existingProduct.harga;
        }
      }
    },
    decreaseQuantity(state, action) {
      const { productId } = action.payload;

      // cari produk
      const existingProduct = state.products.find(
        (product) => product.id === productId
      );
      const productSelected = state.selectedProducts.find(
        (product) => product.id === productId
      );

      // jika produk ada, update jjumlah
      if (existingProduct && existingProduct.jumlah > 1) {
        existingProduct.jumlah -= 1;
        existingProduct.total -= existingProduct.harga;
        if (productSelected) {
          // jika produk dipilih, update totalBiaya
          productSelected.jumlah -= 1;
          productSelected.total -= productSelected.harga;
          state.totalBiaya -= existingProduct.harga;
        }
      }
    },
    removeProduct(state, action) {
      const { productId } = action.payload;

      // hapus produk dari keranjang
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    setSelectedProducts(state, action) {
      const { product, allProducts } = action.payload;

      if (allProducts !== undefined) {
        state.selectedProducts = allProducts ? [...state.products] : [];
      } else {
        let productIndex = state.selectedProducts.findIndex(
          (p) => p.id === product.id
        );

        if (productIndex > -1) {
          state.selectedProducts.splice(productIndex, 1);
        } else {
          state.selectedProducts.push(product);
        }
      }
      // update total biaya
      state.totalBiaya = state.selectedProducts.reduce(
        (total, item) => total + item.harga * item.jumlah,
        0
      );
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
        // console.log("State pertama: ");
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
        const productAdded = action.payload;

        state.isLoading = false;
        state.products = [...state.products, productAdded];
        state.selectedProducts = [...state.selectedProducts, productAdded];
        state.totalBiaya += productAdded.total;
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
        const productId = action.payload;

        state.products = state.products.filter(
          (product) => product.id !== productId
        );

        state.selectedProducts = [];

        state.totalBiaya = state.selectedProducts.reduce(
          (total, item) => total + item.harga * item.jumlah,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // case update jumlah produk
    // .addCase(updateCart.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(updateCart.fulfilled, (state, action) => {
    //   state.isLoading = false;
    // })
    // .addCase(updateCart.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });

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

export const {
  increaseQuantity,
  decreaseQuantity,
  resetCart,
  removeProduct,
  setSelectedProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
