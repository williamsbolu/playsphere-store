import { useOrder } from '../features/checkout/useOrder';
import ErrorPage from '../ui/ErrorPage';
import SpinnerFull from '../ui/SpinnerFull';
import VerifySuccess from '../ui/VerifySuccess';

function VerifyOrder() {
  const { isLoading, order, error, refetch } = useOrder();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  const {
    userEmail,
    paymentMethod,
    deliveryAddress: { email, streetAddress },
  } = order.data;

  return (
    <VerifySuccess
      email={userEmail || email}
      shippingInfo={streetAddress}
      paymentMethod={paymentMethod}
    />
  );
}

export default VerifyOrder;
