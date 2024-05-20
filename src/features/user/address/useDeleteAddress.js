import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteAddress as deleteAddressApi } from '../../../services/apiUser';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const { mutate: deleteAddress, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAddressApi,
    onSuccess: () => {
      toast.success('Address successfully deleted');
      queryClient.invalidateQueries(['address']);
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
        toast.error('failed to delete user address', {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '300px',
          },
        });
      }
    },
  });

  return { deleteAddress, isDeleting };
}
