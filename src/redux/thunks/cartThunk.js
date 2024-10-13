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

// get product in user cart
const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);
      const cartSnapshot = await getDoc(cartRef);

      if (!cartSnapshot.exists()) {
        return { cartProducts: [] }; // jika user belum pernah menambah keranjang
      }

      const cartProducts = cartSnapshot.data().products || [];
      return { cartProducts }; // kembalikan data keranjang
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add product to user cart
const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product, quantity }, { rejectWithValue }) => {
    try {
      const totalBiaya = product.harga * quantity;

      // data produk yang ditambah ke keranjang
      const productToAdd = {
        id: product.id,
        namaProduk: product.namaProduk,
        harga: product.harga,
        jumlah: quantity,
        total: totalBiaya,
        toko: {
          idToko: product.idToko,
          ...product.toko,
        },
      };

      // cek apakah sudah ada keranjang dengan id user userId
      const cartRef = doc(db, "Keranjang", userId);
      const docSnapshot = await getDoc(cartRef);

      if (!docSnapshot.exists()) {
        // jika belum ada, buat dokumen baru
        await setDoc(cartRef, {
          products: arrayUnion(productToAdd), // produk pertama yang ditambah user ke keranjangnya
        });

        return productToAdd;
      }

      // update keranjang
      try {
        await updateDoc(cartRef, {
          products: arrayUnion(productToAdd),
        });
        console.log("Update Cart successful");
      } catch (error) {
        console.error("Error updating document: ", error);
        return rejectWithValue(error.message);
      }

      return productToAdd;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateCart = createAsyncThunk(
  "cart/updateProductQuantity",
  async ({ userId, cartData }, { rejectWithValue }) => {
    const { products, totalBiaya } = cartData;

    try {
      const cartRef = doc(db, "Keranjang", userId);

      // update produk dalam keranjang
      await updateDoc(cartRef, {
        products: products,
      });

      const updatedCart = await getDoc(cartRef);

      return {
        products: updatedCart.products,
      };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

//   "cart/removeFromCart",
//   async ({ userId, productId }, { rejectWithValue }) => {
//     try {
//       const cartRef = doc(db, "Keranjang", userId);

//       // Ambil dokumen keranjang user
//       const cartSnapshot = await getDoc(cartRef);
//       if (!cartSnapshot.exists()) {
//         throw new Error("Keranjang tidak ditemukan.");
//       }

//       const currentCart = cartSnapshot.data().products || [];
//       const productInCart = currentCart.find((item) => item.id === productId);

//       if (productInCart) {
//         // hapus produk dari keranjang
//         await updateDoc(cartRef, {
//           products: arrayRemove(productInCart),
//           totalBiaya: currentTotalBiaya - productInCart.total, // kurangi totalBiaya dgn harga produk yg dihapus
//         });

//         // cek apakah produk yang dihapus adalah produk terakhir
//         // const updatedCartSnapshot = await getDoc(cartRef);
//         // const updatedCart = updatedCartSnapshot.data().products || [];

//         // if (updatedCart.length === 0) {
//         //   // jika tidak ada produk tersisa, hapus dokumen keranjang
//         //   await deleteDoc(cartRef);
//         //   return {
//         //     product: productInCart,
//         //     totalBiaya: 0,
//         //   };
//         // }

//         return {
//           product: productInCart,
//           totalBiaya: currentTotalBiaya - productInCart.total,
//         };
//       } else {
//         throw new Error("Produk tidak ada di keranjang.");
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "Keranjang", userId);
      const cartSnapshot = await getDoc(cartRef);
      if (!cartSnapshot.exists()) {
        throw new Error("Keranjang tidak ditemukan.");
      }

      const currentCart = cartSnapshot.data().products || [];
      const productInCart = currentCart.find((item) => item.id === productId);

      if (productInCart) {
        // hapus produk dari keranjang
        await updateDoc(cartRef, {
          products: arrayRemove(productInCart),
        });

        return productId;
      } else {
        throw new Error("Produk tidak ada di keranjang.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchCart, addToCart, removeFromCart, updateCart };
