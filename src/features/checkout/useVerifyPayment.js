import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { verifyPayment } from '../../services/apiCheckout';

export function useVerifyPayment() {
  const { reference } = useParams();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['verify-payment', reference],
    queryFn: () => verifyPayment(reference),
    enabled: false,
    initialData: {},
  });

  return { isLoading, data, error, refetch };
}
