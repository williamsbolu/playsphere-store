import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.products = action.payload.products;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    addItem(state, action) {
      const newProduct = action.payload;
      const existingItem = state.products.find(
        (item) => item.product._id === newProduct.productId,
      );

      if (!existingItem) {
        state.products.push({
          _id: newProduct.cartId || '',
          user: newProduct.userId || '',
          product: {
            _id: newProduct.productId,
            coverImageUrl: newProduct.coverImageUrl,
            name: newProduct.name,
            originalPrice: newProduct.originalPrice || null,
            quantity: newProduct.productQuantity,
            size: newProduct.size,
            slug: newProduct.slug,
          },
          price: newProduct.price,
          quantity: newProduct.quantity,
          itemPriceTotal: newProduct.price * newProduct.quantity,
        });
      } else {
        existingItem.quantity += newProduct.quantity;
        existingItem.itemPriceTotal += newProduct.price * newProduct.quantity;
      }

      state.totalQuantity += newProduct.quantity;
      state.totalAmount += newProduct.price * newProduct.quantity;
    },
    removeItemQuantity(state, action) {
      const productId = action.payload;
      const item = state.products.find(
        (item) => item.product._id === productId,
      );

      if (item.quantity === 1) {
        cartSlice.caseReducers.removeItem(state, action);
      } else {
        item.quantity--;
        item.itemPriceTotal -= item.price;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },
    removeItem(state, action) {
      const productId = action.payload;
      const item = state.products.find(
        (item) => item.product._id === productId,
      );

      state.totalAmount -= item.itemPriceTotal;
      state.totalQuantity -= item.quantity;
      state.products = state.products.filter(
        (item) => item.product._id !== productId,
      );
    },
  },
});

export const { replaceCart, addItem, removeItem, removeItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
