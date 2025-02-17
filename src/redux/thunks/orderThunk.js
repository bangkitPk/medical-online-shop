import { db } from "@/config/firebase.config";
import { formatDate } from "@/helpers/formatDate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (userId, { rejectWithValue }) => {
    try {
      const orderCollectionRef = collection(db, "Order");
      const userOrdersQuery = query(
        orderCollectionRef,
        where("userId", "==", userId)
      );

      console.log("Proses fetch order dengan....");
      console.log("Id user: " + userId);
      const querySnapshot = await getDocs(userOrdersQuery);
      if (querySnapshot.empty) {
        console.log("Tidak ada order");
        return [];
      }

      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Proses fetch order selesai");
      return userOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// checkout atau menambah pesanan
export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const createdAtString = formatDate(new Date());
      const newOrder = {
        ...orderData,
        status: "diproses",
        createdAt: createdAtString,
      };

      const docRef = await addDoc(collection(db, "Order"), newOrder);
      return { id: docRef.id, ...newOrder };
    } catch (error) {
      console.error("Gagal menambah order:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "Order", orderId);
      const updatedAtString = formatDate(new Date());

      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: updatedAtString,
      });

      return {
        orderId,
        updatedData: { status: newStatus, updatedAt: updatedAtString },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
