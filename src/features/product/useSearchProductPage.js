import { useQuery } from '@tanstack/react-query';
import { getSearchedProducts } from '../../services/apiProducts';
import { useSearchParams } from 'react-router-dom';

export function useSearchProductPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'name-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['productId', query, page, sortBy],
    queryFn: () => getSearchedProducts(query, page, sortBy),
    cacheTime: 0,
  });

  console.log(data);

  return { isLoading, data, error, count: data?.count, refetch };
}
