import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { useAddress } from '../user/address/useAddress';
import SpinnerFull from '../../ui/SpinnerFull';
import AddressForm from '../user/address/AddressForm';
import Button from '../../ui/Button';
import ErrorPage from '../../ui/ErrorPage';
import CheckoutDetails from './CheckoutDetails';
import CheckoutPaymentOptions from './CheckoutPaymentOptions';
import CheckoutAddressList from './CheckoutAddressList';
import { useUser } from '../authentication/useUser';
import axios from 'axios';
import { PLAYSPHERE_API_ROUTE } from '../../utils/constants';
import SpinnerButton from '../../ui/SpinnerButton';

function CheckoutOverview() {
  const [selectedOption, setSelectedOption] = useState();
  const [isCheckingOut, setIsCheckingOut] = useState();
  const cart = useSelector((state) => state.cart);
  const { user } = useUser();

  const {
    isLoading: isLoadingAddress,
    data: addresses,
    error,
    refetch,
  } = useAddress();

  if (isLoadingAddress) return <SpinnerFull />;
  if (error) return <ErrorPage type="full" refetch={refetch} />;
  //   const defaultAddress = data.find((el) => el.isDefault);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const checkOutHandler = async () => {
    if (selectedOption === 'pay-with-card') {
      setIsCheckingOut(true);
      try {
        const storedToken = localStorage.getItem('auth-token');

        const res = await axios.get(
          `${PLAYSPHERE_API_ROUTE}/api/v1/order/paystack?email=${user.email}&amount=${cart.totalAmount * 100}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        const paystackObj = res.data;
        const url = paystackObj?.data?.authorization_url;

        if (url) window.location.href = paystackObj.data.authorization_url;
      } catch (error) {
        console.log(error);
      }
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="app-container grid grid-cols-[2fr_1fr] gap-10 py-10 text-black">
      {addresses.length === 0 && (
        <AddressForm isCheckout={true} isAddingDefault={true} />
      )}

      {addresses.length > 0 && (
        <div className="grid gap-7">
          <h1 className="font-heading text-xl font-medium text-body">
            Review & Payments
          </h1>

          <CheckoutAddressList data={addresses} />

          <div className="space-y-4">
            <h3 className="text-base font-normal">Shipping Method</h3>

            <div className="flex items-center justify-between rounded-[3px] border border-solid border-[#e1e3e4] bg-white px-5 py-4 text-sm">
              <h3>Standard Shipping</h3>
              <p>3-5 working days</p>
              <p>
                From <span>{formatCurrency(3000)}</span>
              </p>
            </div>
          </div>

          <CheckoutPaymentOptions
            selectedOption={selectedOption}
            onHandleChange={handleOptionChange}
          />

          <Button
            additionalClass="justify-self-center w-[70%] !py-3 h-[44px]"
            disabled={!selectedOption || isCheckingOut}
            isCheckout={true}
            onClick={checkOutHandler}
          >
            {isCheckingOut ? <SpinnerButton /> : 'Continue to Payment'}
          </Button>
        </div>
      )}

      <CheckoutDetails cart={cart} />
    </section>
  );
}

export default CheckoutOverview;
