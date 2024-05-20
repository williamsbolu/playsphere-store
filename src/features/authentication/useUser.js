import { useQuery } from '@tanstack/react-query';
import { isLoggedIn } from '../../services/apiAuth';

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: isLoggedIn,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return {
    isLoading,
    isAuthenticated: data?.role === 'authenticated',
    user: data?.user || {},
  };
}
