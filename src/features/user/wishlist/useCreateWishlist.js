import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createWishlist as createWishlistApi } from '../../../services/apiUser';

export function useCreateWishlist() {
  const { mutate: createWishlist, isLoading: isCreating } = useMutation({
    mutationFn: createWishlistApi,
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

  return { createWishlist, isCreating };
}
