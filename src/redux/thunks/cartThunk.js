import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

// get product in cart
const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);
      const cartSnapshot = await getDoc(cartRef);

      if (!cartSnapshot.exists()) {
        return { cartProducts: [], cartTotalBiaya: 0 }; // jika keranjang kosong atau belum ada
      }

      const cartProducts = cartSnapshot.data().products || [];
      const cartTotalBiaya = cartSnapshot.data().totalBiaya || 0;
      return { cartProducts, cartTotalBiaya }; // kembalikan data keranjang
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add product to cart
const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const quantity = 1; // default jumlah produk
      const totalPrice = product.harga * quantity;

      // data produk yang ditambah ke keranjang
      const productToAdd = {
        id: product.id,
        namaProduk: product.namaProduk,
        harga: product.harga,
        jumlah: quantity,
        total: totalPrice,
      };

      const cartRef = doc(db, "Keranjang", userId);

      // cek apakah sudah ada keranjang dengan id user userId
      const docSnapshot = await getDoc(cartRef);

      if (!docSnapshot.exists()) {
        // jika belum, buat dokumen baru
        await setDoc(cartRef, {
          products: arrayUnion(productToAdd), // produk pertama
          // totalBiaya: productToAdd.total,
        });

        // kembalikan payload
      }

      // jika sudah ada, ambil total biaya keranjang
      // const currentTotalBiaya = docSnapshot.data().totalBiaya || 0;

      // update keranjang
      await updateDoc(cartRef, {
        products: arrayUnion(productToAdd),
        // totalBiaya: currentTotalBiaya + productToAdd.total, // tambahkan harga produk baru ke totalBiaya
      });
      // currentTotalBiaya += productToAdd.total;

      // return {
      //   productToAdd,
      //   totalBiaya: currentTotalBiaya,
      // }; // kembalikan payload
      return productToAdd;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// menambah jumlah produk tertentu di keranjang
const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);
      const cartSnapshot = await getDoc(cartRef);
      const currentCart = cartSnapshot.data().products;

      const updatedCart = currentCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              jumlah: product.jumlah + 1,
              total: product.harga * (product.jumlah + 1),
            }
          : product
      );

      await updateDoc(cartRef, {
        products: updatedCart,
      });

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// mengurangi jumlah produk tertentu di keranjang
const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);
      const cartSnapshot = await getDoc(cartRef);
      const currentCart = cartSnapshot.data().products;

      const updatedCart = currentCart.map((product) =>
        product.id === productId && product.jumlah > 1
          ? {
              ...product,
              jumlah: product.jumlah - 1,
              total: product.harga * (product.jumlah - 1),
            }
          : product
      );

      await updateDoc(cartRef, {
        products: updatedCart,
      });

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);

      // Ambil dokumen keranjang user
      const cartSnapshot = await getDoc(cartRef);
      if (!cartSnapshot.exists()) {
        throw new Error("Keranjang tidak ditemukan.");
      }

      const currentCart = cartSnapshot.data().products || [];
      const currentTotalBiaya = cartSnapshot.data().totalBiaya || 0;
      const productInCart = currentCart.find((item) => item.id === productId);

      if (productInCart) {
        // hapus produk dari keranjang
        await updateDoc(cartRef, {
          products: arrayRemove(productInCart),
          totalBiaya: currentTotalBiaya - productInCart.total, // kurangi totalBiaya dgn harga produk yg dihapus
        });

        // cek apakah produk yang dihapus adalah produk terakhir
        const updatedCartSnapshot = await getDoc(cartRef);
        const updatedCart = updatedCartSnapshot.data().products || [];

        if (updatedCart.length === 0) {
          // jika tidak ada produk tersisa, hapus dokumen keranjang
          await deleteDoc(cartRef);
          return {
            product: productInCart,
            totalBiaya: 0,
          };
        }

        return {
          product: productInCart,
          totalBiaya: currentTotalBiaya - productInCart.total,
        };
      } else {
        throw new Error("Produk tidak ada di keranjang.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export {
  fetchCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
};
