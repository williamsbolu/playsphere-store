import { useMutation } from '@tanstack/react-query';
import { updateCart as updateCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useUpdateCart() {
  const { mutate: updateCart, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cartId, data }) => updateCartApi(cartId, data),
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

  return { updateCart, isUpdating };
}
