import { useQuery } from '@tanstack/react-query';
import { getUserWishlistData } from '../../../services/apiUser';
import { useSearchParams } from 'react-router-dom';

export function useWishlist() {
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: wishlist,
    error,
    refetch,
  } = useQuery({
    queryKey: ['wishlist', page],
    queryFn: () => getUserWishlistData(page),
    cacheTime: 0,
  });

  return { isLoading, wishlist, error, count: wishlist?.count, refetch };
}
