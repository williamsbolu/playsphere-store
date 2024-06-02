import { replaceAddress } from './addressSlice';

export const replaceUserCheckoutAddress = () => {
  return async (dispatch) => {
    const storedAddress = JSON.parse(localStorage.getItem('checkout'));

    if (!storedAddress) {
      return;
    }

    const now = new Date().getTime();

    if (now > storedAddress.expiration) {
      // Data has expired, remove it from local storage
      localStorage.removeItem('checkout');
      return;
    }

    dispatch(replaceAddress(storedAddress));
  };
};
