import { useMutation } from '@tanstack/react-query';
import { exportLocalStoredCarts } from '../../services/apiCart';
import { useDispatch } from 'react-redux';
import { getCartData } from './cart-actions';

export function useExportCart() {
  const dispatch = useDispatch();

  const { mutate: exportLocalCart, isLoading } = useMutation({
    mutationFn: exportLocalStoredCarts,
    onSuccess: (data) => {
      dispatch(getCartData());
    },
    onSettled: () => {
      localStorage.removeItem('cart');
    },
  });

  return { exportLocalCart, isLoading };
}
