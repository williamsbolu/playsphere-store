import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import AuthContext from '../../auth-context';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { replaceCart } from '../cart/cartSlice';

export function useLogout(handler = 'none') {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: () => logoutApi(handler),
    onSuccess: () => {
      authCtx.logout();
      dispatch(
        replaceCart({
          products: [],
          totalQuantity: 0,
          totalAmount: 0,
        }),
      );
      toast.remove();
      toast.success('You have successfully logged out');
    },
  });

  return { logout, isLoggingOut };
}
