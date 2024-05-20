import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { useContext, useEffect } from 'react';
import AuthContext from '../auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { replaceCart } from '../features/cart/cartSlice';
import { getCartData } from '../features/cart/cart-actions';
import { Outlet } from 'react-router-dom';
import { setInitial } from '../features/cart/cartModalSlice';
import { getWishlistData } from '../features/user/wishlist/wishlist-actions';
import { saveDataToLocalStorage } from '../utils/helpers';
import { replaceUserCheckoutAddress } from '../features/user/address/address-actions';

let initialLoad = true;
let initialLoadAddress = true;

function AppLayout() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);
  const address = useSelector((state) => state.address.data);
  const cartModalChanged = useSelector((state) => state.cartModal.changed);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      const storedCartData = JSON.parse(localStorage.getItem('cart'));

      if (!storedCartData) {
        return;
      }

      const now = new Date().getTime();
      if (now > storedCartData.expiration) {
        // Data has expired, remove it from local storage
        localStorage.removeItem('cart');
        return;
      }

      // if we have stored cart items in our storage and it is not empty
      if (storedCartData && storedCartData.cart.products.length > 0) {
        dispatch(replaceCart(storedCartData.cart));
      }
    } else {
      dispatch(getCartData());
    }
  }, [authCtx.isLoggedIn, dispatch]);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      dispatch(replaceUserCheckoutAddress());
    }
  }, [authCtx.isLoggedIn, dispatch]);

  useEffect(() => {
    if (initialLoadAddress) {
      initialLoadAddress = false;
      return;
    }

    saveDataToLocalStorage('checkout', address, 'address');
  }, [address]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      dispatch(getWishlistData());
    }
  }, [authCtx.isLoggedIn, dispatch]);

  // store cart data after every change when the user is not authenticated
  useEffect(
    function () {
      if (initialLoad) {
        initialLoad = false;
        return;
      }

      if (!authCtx.isLoggedIn && cart.products.length > 0) {
        saveDataToLocalStorage('cart', cart, 'cart');
      }
    },
    [authCtx.isLoggedIn, cart],
  );

  // this effects runs anytime we update the cartModal state, and set it back to default, so the logic implemented can work
  useEffect(() => {
    dispatch(setInitial());
  }, [cartModalChanged, dispatch]);

  return (
    <>
      <Header />
      <Nav />
      <main className="bg-[#F3F5F6]">{<Outlet />}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
