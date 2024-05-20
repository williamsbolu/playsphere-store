import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import cartModalReducer from './features/cart/cartModalSlice';
import wishlistReducer from './features/user/wishlist/wishlistSlice';
import addressReducer from './features/user/address/addressSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartModal: cartModalReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
  },
});

export default store;
