import { useQuery } from '@tanstack/react-query';
import { getSearchedProducts } from '../../services/apiProducts';
import { useEffect, useState } from 'react';

export function useSearchProduct(query) {
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const {
    isLoading: isLoadingProduct,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ['productId', query],
    queryFn: () => getSearchedProducts(query),
    cacheTime: 0,
    enabled: isQueryEnabled,
    refetchOnMount: false,
    retry: false,
  });

  // Effect to refetch data when queryKey changes and query is enabled
  useEffect(() => {
    if (isQueryEnabled) return;

    if (query !== '') {
      setIsQueryEnabled(true);
    }
  }, [isQueryEnabled, query]);

  return { isLoadingProduct, products, error, refetch, isQueryEnabled };
}
