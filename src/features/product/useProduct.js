import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/apiProducts';

export function useProduct() {
  const { slug } = useParams();

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug),
    retry: false,
    cacheTime: 0,
  });

  return { isLoading, product, error };
}
