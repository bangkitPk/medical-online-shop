// src/features/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

export const getTotalProducts = createAsyncThunk(
  "products/getTotalProducts",
  async (_, { rejectWithValue }) => {
    try {
      const coll = collection(db, "Produk");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ lastDoc }, { rejectWithValue }) => {
    try {
      let productQuery;
      if (lastDoc) {
        // Jika lastDoc ada, tambahkan startAfter untuk pagination
        productQuery = query(
          collection(db, "Produk"),
          orderBy("namaProduk"),
          limit(10),
          startAfter(lastDoc)
        );
      } else {
        // Jika lastDoc tidak ada (fetch pertama)
        productQuery = query(
          collection(db, "Produk"),
          orderBy("namaProduk"),
          limit(10)
        );
      }
      const querySnapshot = await getDocs(productQuery);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      const products = querySnapshot.docs.map((doc) => {
        // map product data
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
        };
      });

      return { products, lastVisibleId: lastVisible ? lastVisible.id : null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    lastDocId: null,
    totalProducts: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.lastDocId = null;
      state.error = null;
      state.isLoading = false;
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
        state.lastDocId = action.payload.lastVisibleId;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
