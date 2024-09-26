import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { clearSearchStates } from "../slices/productSlice";

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
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      const products = querySnapshot.docs.map((doc) => {
        // map product data
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
        };
      });

      return { products, lastDocId: lastVisibleDoc ? lastVisibleDoc.id : null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchKey, { rejectWithValue }) => {
    try {
      clearSearchStates();
      const searchKeyLower = searchKey.toLowerCase();
      console.log("Searching for products with key:", searchKey);
      const productsRef = collection(db, "Produk");
      const productQuery = query(
        productsRef,
        where("namaProduk_lower", ">=", searchKeyLower),
        where("namaProduk_lower", "<=", `${searchKeyLower}\uf8ff`),
        limit(10)
      );

      const snapshot = await getDocs(productQuery);
      console.log("Snapshot fetched:", snapshot.docs.length);

      if (snapshot.empty) {
        console.log("No products found");
        // tidak ditemukan produk
        return {
          items: [],
          lastDocId: null,
          total: 0,
        };
      }

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

      return {
        items: products,
        lastDocId: lastVisibleDoc ? lastVisibleDoc.id : null,
        total: snapshot.size,
      };
    } catch (error) {
      console.error("Error searching products:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
