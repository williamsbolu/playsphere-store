import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import SpinnerButton from '../../ui/SpinnerButton';
import AddressForm from '../user/address/AddressForm';
import CheckoutAddressList from './CheckoutAddressList';
import CheckoutPaymentOptions from './CheckoutPaymentOptions';
import CheckoutShippingInfo from './CheckoutShippingInfo';
import { createOrderInformation } from '../../utils/helpers';

function Checkout({
  cart,
  onSelectOption,
  selectedOption,
  onHandlePaymentOnDelivery,
  onHandleBankTransfer,
  onHandlePaystack,
  isCheckingOut,
}) {
  const address = useSelector((state) => state.address.data);
  const deliveryAddress = address[0];

  const checkOutHandler = async () => {
    if (!deliveryAddress) {
      toast.error('Please add your shipping address');
      return;
    }

    // Arrange the order information for the server
    const order = createOrderInformation(cart, deliveryAddress, selectedOption);

    if (selectedOption === 'pay-on-delivery') {
      onHandlePaymentOnDelivery(order);
    }

    if (selectedOption === 'pay-with-card') {
      // the email here is needed for paystack checkout
      onHandlePaystack(order, deliveryAddress.email);
    }

    if (selectedOption === 'direct-bank-transfer') {
      onHandleBankTransfer(order);
    }
  };

  const btnOrderText =
    selectedOption === 'pay-with-card' ? 'Continue to Payment' : 'Place Order';

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
            onHandleChange={(e) => onSelectOption(e.target.value)}
          />

          <Button
            variation="secondary"
            additionalClass="justify-self-center w-[70%] !py-3 h-[44px]"
            disabled={
              !selectedOption || (isCheckingOut && cart.products.length > 0)
            }
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

export default Checkout;
