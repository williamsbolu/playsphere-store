import { useMutation } from '@tanstack/react-query';
import { changePassword as changePasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useChangePassword() {
  const { mutate: changePassword, isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (user) => {
      // update the user token
      localStorage.setItem('auth-token', user.token);

      toast.success('Password updated successfully');
    },
    onError: (err) => {
      if (
        err?.response?.status === 401 &&
        err?.response?.data.message.startsWith('Your current password')
      ) {
        toast.error('Your current password is incorrect');
      } else {
        toast.error('Error updating password');
      }
    },
  });

  return { changePassword, isLoading };
}
