import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../services/apiProducts';

export function useProductById(id) {
  const {
    isLoading: isLoadingProduct,
    data: product,
    error,
    refetch,
  } = useQuery({
    queryKey: ['productId', id],
    queryFn: () => getProductById(id),
    cacheTime: 0,
  });

  return { isLoadingProduct, product, error, refetch };
}
