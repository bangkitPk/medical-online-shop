import { createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchOrder } from "../thunks/orderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    filteredOrders: [],
    filterStatus: "Semua",
    loading: false,
    error: null,
  },
  reducers: {
    filterOrders: (state, action) => {
      let statusFilter = action.payload.toLowerCase();
      state.filterStatus = action.payload;
      if (statusFilter === "semua") {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter(
          (order) => order.status === statusFilter
        );
      }
    },
  },
  extraReducers: (builder) => {
    // add order
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload];
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update order
    // .addCase(editOrder.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(editOrder.fulfilled, (state, action) => {
    //   const { orderId, updatedData } = action.payload;
    //   const existingOrder = state.orders.find(
    //     (order) => order.id === orderId
    //   );

    //   if (existingOrder) {
    //     // Update order di state
    //     Object.assign(existingOrder, updatedData);
    //   }

    //   state.loading = false;
    // })
    // .addCase(editOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { filterOrders } = orderSlice.actions;
export default orderSlice.reducer;
