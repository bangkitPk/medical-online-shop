// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guestToast: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestToast: (state, action) => {
      state.guestToast = action.payload;
    },
    clearGuestToast: (state) => {
      state.guestToast = null;
    },
  },
});

export const { setGuestToast, clearGuestToast } = guestSlice.actions;
export default guestSlice.reducer;
