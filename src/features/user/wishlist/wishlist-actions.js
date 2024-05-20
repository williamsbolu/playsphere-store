import axios from 'axios';
import {
  replaceWishlist,
  setFetchingComplete,
  setIsFetching,
} from './wishlistSlice';
import { PLAYSPHERE_API_ROUTE } from '../../../utils/constants';

// this function was implemented to manage the wishlist state for use cases like determining whether an item exists in wishlist
export const getWishlistData = () => {
  return async (dispatch) => {
    const storedToken = localStorage.getItem('auth-token');
    dispatch(setIsFetching());

    try {
      const res = await axios.get(
        `${PLAYSPHERE_API_ROUTE}/api/v1/wishlist/getUserWishlistData`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      const data = res.data.data;
      dispatch(replaceWishlist(data));
    } catch (err) {
      return;
    }
    dispatch(setFetchingComplete());
  };
};
