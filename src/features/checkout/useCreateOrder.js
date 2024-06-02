import { useMutation } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../../services/apiCheckout';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { replaceCart } from '../cart/cartSlice';

export function useCreateOrder() {
  const dispatch = useDispatch();

  const { mutate: createOrder, isLoading: isCreatingOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      localStorage.removeItem('cart');
      dispatch(
        replaceCart({
          products: [],
          totalQuantity: 0,
          totalAmount: 0,
        }),
      );
    },
    onError: (err) => {
      toast.error(
        'An error occurred while processing your order. Try again later',
      );
    },
  });

  return { createOrder, isCreatingOrder };
}
