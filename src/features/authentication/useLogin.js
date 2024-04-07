import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import AuthContext from '../../auth-context';

export function useLogin() {
  const authCtx = useContext(AuthContext);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      localStorage.setItem('auth-token', user.token);
      authCtx.login();
      toast.success('Login successful');
    },
  });

  return { login, isLoading };
}
