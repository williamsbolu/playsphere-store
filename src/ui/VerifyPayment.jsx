import ErrorPage from './ErrorPage';
import SpinnerFull from './SpinnerFull';
import VerifySuccess from './VerifySuccess';
import { useVerifyPayment } from '../features/checkout/useVerifyPayment';

function VerifyPayment() {
  const { isLoading, data, error, refetch } = useVerifyPayment();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} />;
  console.log(data);

  // based on the data status message

  return <VerifySuccess />;
}

export default VerifyPayment;
