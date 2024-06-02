import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/apiCheckout';

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
    refetch,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId),
  });

  return { isLoading, order, error, refetch };
}
