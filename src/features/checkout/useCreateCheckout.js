import { useMutation } from '@tanstack/react-query';
import { createCheckOut as createCheckOutApi } from '../../services/apiCheckout';

export function useCreateCheckout() {
  const { mutate: createCheckOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ email, amount, order }) =>
      createCheckOutApi(email, amount, order),
    onError: (err) => {
      console.log(err);
    },
  });

  return { createCheckOut, isCheckingOut };
}
