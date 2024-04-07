import axios from 'axios';
import { PLAYSPHERE_API_ROUTE } from '../../utils/constants';
import { replaceCart } from './cartSlice';

export const getCartData = () => {
  return async (dispatch) => {
    const storedToken = localStorage.getItem('auth-token');

    try {
      const res = await axios.get(
        `${PLAYSPHERE_API_ROUTE}/api/v1/cart/getUserCartData`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      const data = res.data.data;
      dispatch(
        replaceCart({
          products: data.cartItems,
          totalQuantity: data.totalQuantity,
          totalAmount: data.totalAmount,
        }),
      );
    } catch (err) {
      return;
    }
  };
};
