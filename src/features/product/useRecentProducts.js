import { useQuery } from '@tanstack/react-query';
import { getRecentProducts } from '../../services/apiProducts';

export function useRecentProducts() {
  const {
    isLoading,
    data: product,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recent-products'],
    queryFn: () => getRecentProducts(),
  });

  return { isLoading, product, error, refetch };
}
