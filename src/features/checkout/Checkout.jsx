import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import SpinnerButton from '../../ui/SpinnerButton';
import AddressForm from '../user/address/AddressForm';
import CheckoutAddressList from './CheckoutAddressList';
import CheckoutPaymentOptions from './CheckoutPaymentOptions';
import CheckoutShippingInfo from './CheckoutShippingInfo';
import { PLAYSPHERE_API_ROUTE } from '../../utils/constants';

function Checkout({ cart }) {
  const address = useSelector((state) => state.address.data);

  const [selectedOption, setSelectedOption] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const deliveryAddress = address[0];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const checkOutHandler = async () => {
    if (!deliveryAddress) {
      toast.error('Please add your shipping address');
      return;
    }

    if (selectedOption === 'pay-with-card') {
      setIsCheckingOut(true);
      try {
        const storedToken = localStorage.getItem('auth-token');

        const res = await axios.get(
          `${PLAYSPHERE_API_ROUTE}/api/v1/order/paystack?email=${address.email}&amount=${cart.totalAmount * 100}`,
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
      {address?.length === 0 && (
        <AddressForm isCheckout={true} isAddingDefault={true} />
      )}

      {address?.length > 0 && (
        <div className="grid gap-7">
          <h1 className="font-heading text-xl font-medium text-body">
            Review & Payments
          </h1>

          <CheckoutAddressList data={address} />

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

export default Checkout;
