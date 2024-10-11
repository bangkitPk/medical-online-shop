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
import { clearFilterStates, clearSearchStates } from "../slices/productSlice";

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
          limit(12),
          startAfter(lastDoc)
        );
      } else {
        // Jika lastDoc tidak ada (fetch pertama)
        productQuery = query(
          collection(db, "Produk"),
          orderBy("namaProduk"),
          limit(12)
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
  async ({ lastDoc, searchKey }, { rejectWithValue }) => {
    try {
      clearSearchStates();
      const searchKeyLower = searchKey.toLowerCase();
      console.log("Searching for products with key:", searchKey);
      const productsRef = collection(db, "Produk");

      // Query untuk menghitung semua produk yang dicari
      const totalCountQuery = query(
        productsRef,
        where("namaProduk_lowercase", ">=", searchKeyLower),
        where("namaProduk_lowercase", "<=", `${searchKeyLower}\uf8ff`)
      );
      const totalSnapshot = await getDocs(totalCountQuery);
      const totalProducts = totalSnapshot.size;

      // query untuk limit produk (pagination)
      let productQuery;
      if (lastDoc) {
        productQuery = query(
          productsRef,
          where("namaProduk_lowercase", ">=", searchKeyLower),
          where("namaProduk_lowercase", "<=", `${searchKeyLower}\uf8ff`),
          limit(12),
          startAfter(lastDoc) // cari setelah dokumen terakhir pada pemanggilan sebelumnya
        );
      } else {
        productQuery = query(
          productsRef,
          where("namaProduk_lowercase", ">=", searchKeyLower),
          where("namaProduk_lowercase", "<=", `${searchKeyLower}\uf8ff`),
          limit(12)
        );
      }

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
        total: totalProducts,
      };
    } catch (error) {
      console.error("Error searching products:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async ({ lastDoc, filterCategory }, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "Produk");

      // Query to count all products in the category
      const totalCountQuery = query(
        productsRef,
        where("idKategori", "==", filterCategory)
      );
      const totalSnapshot = await getDocs(totalCountQuery);
      const totalProducts = totalSnapshot.size;

      // Query to fetch filtered products by category with pagination
      let productQuery;
      if (lastDoc) {
        productQuery = query(
          productsRef,
          where("idKategori", "==", filterCategory),
          limit(12),
          startAfter(lastDoc)
        );
      } else {
        productQuery = query(
          productsRef,
          where("idKategori", "==", filterCategory),
          limit(12)
        );
      }

      const snapshot = await getDocs(productQuery);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        items: products,
        lastDocId: lastVisibleDoc ? lastVisibleDoc.id : null,
        total: totalProducts,
        category: filterCategory,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
