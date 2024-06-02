import { useContext } from 'react';
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
import { createOrderInformation } from '../../utils/helpers';

function CheckoutAuth({
  cart,
  onSelectOption,
  selectedOption,
  onHandlePaymentOnDelivery,
  onHandleBankTransfer,
  onHandlePaystack,
  isCheckingOut,
}) {
  const { user } = useUser();

  const {
    isLoading: isLoadingAddress,
    data: addresses,
    error,
    refetch,
  } = useAddress();

  if (isLoadingAddress) return <SpinnerFull />;
  if (error) return <ErrorPage type="full" refetch={refetch} />;

  const deliveryAddress = addresses.find((address) => address.isDefault);

  const checkOutHandler = async () => {
    if (!deliveryAddress) {
      toast.error('Please select your shipping address');
      return;
    }

    // Arrange the user order details for server use
    const order = createOrderInformation(
      cart,
      deliveryAddress,
      selectedOption,
      user._id,
    );

    console.log(order);
    console.log(user);

    if (selectedOption === 'pay-on-delivery') {
      onHandlePaymentOnDelivery(order);
    }

    if (selectedOption === 'pay-with-card') {
      // the email here is needed for paystack checkout
      onHandlePaystack(order, user?.email);
    }

    if (selectedOption === 'direct-bank-transfer') {
      onHandleBankTransfer(order);
    }
  };

  const btnOrderText =
    selectedOption === 'pay-with-card' ? 'Continue to Payment' : 'Place Order';

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
            onHandleChange={(e) => onSelectOption(e.target.value)}
          />

          <Button
            variation="secondary"
            additionalClass="justify-self-center w-[70%] !py-3 h-[44px]"
            disabled={!selectedOption || isCheckingOut}
            isCheckout={true}
            onClick={checkOutHandler}
          >
            {isCheckingOut ? <SpinnerButton /> : btnOrderText}
          </Button>
        </div>
      )}
    </>
  );
}

export default CheckoutAuth;
