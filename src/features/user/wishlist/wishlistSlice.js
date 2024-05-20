import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  fetching: false,
};

const wishSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    replaceWishlist(state, action) {
      state.items = action.payload;
    },
    addWishlist(state, action) {
      state.items.push(action.payload);
    },
    removeWishlist(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    setIsFetching(state, action) {
      state.fetching = true;
    },
    setFetchingComplete(state, action) {
      state.fetching = false;
    },
  },
});

export const {
  replaceWishlist,
  addWishlist,
  removeWishlist,
  setIsFetching,
  setFetchingComplete,
} = wishSlice.actions;
export default wishSlice.reducer;
