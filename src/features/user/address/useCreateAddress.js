import { useMutation } from '@tanstack/react-query';
import { createAddress as createAddressApi } from '../../../services/apiUser';
import toast from 'react-hot-toast';

export function useCreateAddress() {
  const { mutate: createAddress, isLoading: isCreating } = useMutation({
    mutationFn: createAddressApi,
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
        toast.error('Failed to create user Address!');
      }
    },
  });

  return { createAddress, isCreating };
}
