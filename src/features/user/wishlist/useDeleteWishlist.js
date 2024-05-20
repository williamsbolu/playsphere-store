import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteWishlist as deleteWishlistApi } from '../../../services/apiUser';

export function useDeleteWishlist() {
  const queryClient = useQueryClient();

  const { mutate: deleteWishlist, isLoading: isDeleting } = useMutation({
    mutationFn: deleteWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
    },
    onError: (err) => {
      toast.remove();
      if (
        err?.response?.status === 401 &&
        err?.response?.data?.message.startsWith('Your token has expired!')
      ) {
        toast.error('Session expired. Please login again.', {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '300px',
          },
        });
      } else {
        toast.error('Something went wrong. Please try again later', {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '300px',
          },
        });
      }
    },
  });

  return { deleteWishlist, isDeleting };
}
