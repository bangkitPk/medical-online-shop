import { db } from "@/config/firebase.config";
import { formatDate } from "@/helpers/formatDate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
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

      const querySnapshot = await getDocs(userOrdersQuery);
      if (querySnapshot.empty) {
        console.log("Tidak ada order");
        return [];
      }

      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return userOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk untuk mengedit order
// export const editOrder = createAsyncThunk(
//   "order/editOrder",
//   async ({ orderId, updatedData }, { rejectWithValue }) => {
//     try {
//       const orderRef = doc(db, "Order", orderId);
//       await updateDoc(orderRef, {
//         ...updatedData,
//         updatedAt: Timestamp.now(),
//       });

//       return { orderId, updatedData };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
