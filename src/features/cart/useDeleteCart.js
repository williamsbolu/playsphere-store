import { useMutation } from '@tanstack/react-query';
import { deleteCart as deleteCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useDeleteCart() {
  const { mutate: deleteCart, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCartApi,
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

  return { deleteCart, isDeleting };
}
