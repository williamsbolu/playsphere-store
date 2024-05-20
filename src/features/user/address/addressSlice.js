import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: { data: [] },
  reducers: {
    replaceAddress(state, action) {
      state.data = action.payload.address; // an array of address
    },
    addAddress(state, action) {
      const newAddress = action.payload;
      state.data.push(newAddress);
    },
    updateUserAddress(state, action) {
      const address = action.payload;

      const existingAddress = state.data.find(
        (item) => item._id === address._id,
      );

      existingAddress.email = address.email;
      existingAddress.firstName = address.firstName;
      existingAddress.lastName = address.lastName;
      existingAddress.phone = address.phone;
      existingAddress.streetAddress = address.streetAddress;
      existingAddress.directions = address.directions;
      existingAddress.state = address.state;
      existingAddress.city = address.city;
    },
  },
});

export const { replaceAddress, addAddress, updateUserAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
