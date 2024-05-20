import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../authentication/useUser';
import { useAddress } from '../user/address/useAddress';
import AddressForm from '../user/address/AddressForm';
import CheckoutAddressList from './CheckoutAddressList';
import CheckoutShippingInfo from './CheckoutShippingInfo';
import CheckoutPaymentOptions from './CheckoutPaymentOptions';
import Button from '../../ui/Button';
import ErrorPage from '../../ui/ErrorPage';
import SpinnerButton from '../../ui/SpinnerButton';
import SpinnerFull from '../../ui/SpinnerFull';
import { PLAYSPHERE_API_ROUTE } from '../../utils/constants';

function CheckoutAuth({ cart }) {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const {
    isLoading: isLoadingAddress,
    data: addresses,
    error,
    refetch,
  } = useAddress();

  if (isLoadingAddress) return <SpinnerFull />;
  if (error) return <ErrorPage type="full" refetch={refetch} />;

  const deliveryAddress = addresses.find((address) => address.isDefault);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const checkOutHandler = async () => {
    if (!deliveryAddress) {
      toast.error('Please select your shipping address');
      return;
    }

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
    <>
      {addresses.length === 0 && (
        <AddressForm isCheckout={true} isAddingDefault={true} />
      )}

      {addresses.length > 0 && (
        <div className="grid gap-7">
          <h1 className="font-heading text-xl font-medium text-body">
            Review & Payments
          </h1>

          <CheckoutAddressList data={addresses} />

          <CheckoutShippingInfo />

          <CheckoutPaymentOptions
            selectedOption={selectedOption}
            onHandleChange={handleOptionChange}
          />

          <Button
            variation="secondary"
            additionalClass="justify-self-center w-[70%] !py-3 h-[44px]"
            disabled={!selectedOption || isCheckingOut}
            isCheckout={true}
            onClick={checkOutHandler}
          >
            {isCheckingOut ? <SpinnerButton /> : 'Continue to Payment'}
          </Button>
        </div>
      )}
    </>
  );
}

export default CheckoutAuth;
