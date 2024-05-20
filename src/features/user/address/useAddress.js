import { useQuery } from '@tanstack/react-query';
import { getUserAddress } from '../../../services/apiUser';

export function useAddress() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['address'],
    queryFn: getUserAddress,
    cacheTime: 0,
  });

  return { isLoading, data: data?.data, error, refetch };
}
