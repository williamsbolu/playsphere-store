import { useQuery } from '@tanstack/react-query';
import { getHotDeals } from '../../services/apiProducts';

export function useHotDeals() {
  const {
    isLoading,
    data: product,
    error,
    refetch,
  } = useQuery({
    queryKey: ['hot-deals'],
    queryFn: () => getHotDeals(),
  });

  return { isLoading, product, error, refetch };
}
