import { useMutation } from '@tanstack/react-query';
import { createCart as createCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useCreateCart() {
  const { mutate: createCart, isLoading: isCreating } = useMutation({
    mutationFn: createCartApi,
    onError: (err) => {
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

  return { createCart, isCreating };
}
