import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../../services/apiProducts';
import { useSearchParams } from 'react-router-dom';

export function useProducts(params) {
  const [searchParams] = useSearchParams();

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'createdAt-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', params, sortBy, page],
    queryFn: () => getAllProducts({ params, sortBy, page }),
  });

  return { isLoading, products, error, count: products?.count, refetch };
}
