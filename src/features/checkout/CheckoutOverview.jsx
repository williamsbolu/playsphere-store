import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutAuth from './CheckoutAuth';
import CheckoutDetails from './CheckoutDetails';
import AuthContext from '../../auth-context';
import Checkout from './Checkout';
import { useCreateCheckout } from './useCreateCheckout';
import { useCreateOrder } from './useCreateOrder';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CheckoutOverview() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const { isCreatingOrder, createOrder } = useCreateOrder();
  const { isCheckingOut, createCheckOut } = useCreateCheckout();

  const isLoading = isCheckingOut || isCreatingOrder;

  function payOnDeliveryHandler(order) {
    createOrder(order, {
      onSuccess: (data) => {
        const orderId = data.data._id;
        navigate(`/checkout/verify/${orderId}`);
      },
    });
  }

  function bankTransferHandler(order) {
    createOrder(order, {
      onSuccess: (data) => {
        const orderId = data.data._id;
        navigate(`/checkout/order-received/${orderId}`);
      },
    });
  }

  function checkoutPaystackHandler(order, email) {
    toast.error(
      'Service not available currently. Please use another payment option.',
      {
        style: {
          background: '#FCE2E2',
          color: '#F05D5D',
          maxWidth: '350px',
        },
      },
    );
    return;
    // createCheckOut(
    //   {
    //     email,
    //     amount: cart.totalAmount,
    //     order,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       console.log(data);
    //       // const paystackObj = res.data;
    //       // const url = paystackObj?.data?.authorization_url;
    //       // if (url) window.location.href = paystackObj.data.authorization_url;
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   },
    // );
  }

  function changeSelectedOptionHandler(option) {
    if (cart.products.length === 0) return;
    setSelectedOption(option);
  }

  return (
    <section className="app-container grid grid-cols-[2fr_1fr] gap-10 py-10 text-black">
      {authCtx.isLoggedIn ? (
        <CheckoutAuth
          cart={cart}
          selectedOption={selectedOption}
          onSelectOption={changeSelectedOptionHandler}
          onHandlePaymentOnDelivery={payOnDeliveryHandler}
          onHandleBankTransfer={bankTransferHandler}
          onHandlePaystack={checkoutPaystackHandler}
          isCheckingOut={isLoading}
        />
      ) : (
        <Checkout
          cart={cart}
          selectedOption={selectedOption}
          onSelectOption={changeSelectedOptionHandler}
          onHandlePaymentOnDelivery={payOnDeliveryHandler}
          onHandleBankTransfer={bankTransferHandler}
          onHandlePaystack={checkoutPaystackHandler}
          isCheckingOut={isLoading}
        />
      )}

      <CheckoutDetails cart={cart} />
    </section>
  );
}

export default CheckoutOverview;
