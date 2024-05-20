import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  changed: false,
};

const cartModalSlice = createSlice({
  name: 'cartChanged',
  initialState: initialState,
  reducers: {
    openCartModal(state) {
      state.changed = true;
    },
    setInitial(state) {
      state.changed = false;
    },
  },
});

export const { openCartModal, setInitial } = cartModalSlice.actions;

export default cartModalSlice.reducer;
