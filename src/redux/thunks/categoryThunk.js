import { db } from "@/config/firebase.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const coll = collection(db, "Kategori");
      const snapshot = await getDocs(coll);
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        namaKategori: doc.data().namaKategori,
      }));

      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
