import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../thunks/categoryThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { clearAllProducts, clearSearchStates } = categorySlice.actions;
export default categorySlice.reducer;
