import { useContext } from 'react';
import { useSelector } from 'react-redux';
import CheckoutAuth from './CheckoutAuth';
import CheckoutDetails from './CheckoutDetails';
import AuthContext from '../../auth-context';
import Checkout from './Checkout';

function CheckoutOverview() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);

  return (
    <section className="app-container grid grid-cols-[2fr_1fr] gap-10 py-10 text-black">
      {authCtx.isLoggedIn ? (
        <CheckoutAuth cart={cart} />
      ) : (
        <Checkout cart={cart} />
      )}

      <CheckoutDetails cart={cart} />
    </section>
  );
}

export default CheckoutOverview;
