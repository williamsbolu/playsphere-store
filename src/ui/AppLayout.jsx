import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { useContext, useEffect } from 'react';
import AuthContext from '../auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { replaceCart } from '../features/cart/cartSlice';
import { getCartData } from '../features/cart/cart-actions';

let initialLoad = true;

function AppLayout({ children }) {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      const storedCartData = JSON.parse(localStorage.getItem('cart'));

      // if we have have stored cart items in our storage and it is not empty
      if (storedCartData && storedCartData.products.length > 0) {
        dispatch(replaceCart(storedCartData));
      }
    } else {
      dispatch(getCartData());
    }
  }, [authCtx.isLoggedIn, dispatch]);

  // store cart data after every change when the user is not authenticated
  useEffect(
    function () {
      if (initialLoad) {
        initialLoad = false;
        return;
      }

      if (!authCtx.isLoggedIn) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    },
    [authCtx.isLoggedIn, cart],
  );

  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
