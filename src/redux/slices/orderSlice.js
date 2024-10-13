import { createSlice } from "@reduxjs/toolkit";
import { addOrder, updateOrder, fetchOrder } from "../thunks/orderThunk";

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
    resetOrder(state) {
      state.orders = [];
      state.filteredOrders = [];
      state.filterStatus = "Semua";
      state.loading = false;
      state.error = null;
    },
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
        state.filteredOrders = action.payload;
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
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const { orderId, updatedData } = action.payload;
        const existingOrderIndex = state.orders.findIndex(
          (order) => order.id === orderId
        );

        if (existingOrderIndex !== -1) {
          state.orders[existingOrderIndex] = {
            ...state.orders[existingOrderIndex],
            ...updatedData,
          };
        }

        const filteredOrderIndex = state.filteredOrders.findIndex(
          (order) => order.id === orderId
        );
        if (filteredOrderIndex !== -1) {
          state.filteredOrders[filteredOrderIndex] = {
            ...state.filteredOrders[filteredOrderIndex],
            ...updatedData,
          };
        }

        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
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

export const { resetOrder, filterOrders } = orderSlice.actions;
export default orderSlice.reducer;
