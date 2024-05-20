import { useMutation } from '@tanstack/react-query';
import { updateAddress as updateAddressApi } from '../../../services/apiUser';
import toast from 'react-hot-toast';

export function useUpdateAddress() {
  const { mutate: updateAddress, isLoading: isUpdating } = useMutation({
    mutationFn: ({ addressId, data }) => updateAddressApi(addressId, data),
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
        toast.error('Failed to update user Address!');
      }
    },
  });

  return { updateAddress, isUpdating };
}
