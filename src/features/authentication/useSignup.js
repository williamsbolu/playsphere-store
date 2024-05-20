import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import AuthContext from '../../auth-context';

export function useSignup() {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      localStorage.setItem('auth-token', user.token);
      authCtx.login();
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success('Login successful');
    },
  });

  return { signUp, isLoading };
}
