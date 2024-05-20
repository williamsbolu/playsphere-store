import { FiEdit } from 'react-icons/fi';
import { useUser } from '../authentication/useUser';
import ModalContainer from '../../ui/ModalContainer';
import AddressForm from '../user/address/AddressForm';
import { useUpdateAddress } from '../user/address/useUpdateAddress';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import AuthContext from '../../auth-context';

function CheckoutAddress({ address }) {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { _id, firstName, lastName, phone, streetAddress } = address;
  const { user } = useUser();
  const { updateAddress, isUpdating } = useUpdateAddress();

  function UpdateDefaultHandler() {
    if (isUpdating) return;
    const data = { isDefault: true };

    updateAddress(
      { addressId: _id, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['address']);
        },
        onError: () => {
          toast.error('Coudn');
        },
      },
    );
  }

  function onSubmit() {
    if (authCtx.isLoggedIn) {
      UpdateDefaultHandler();
    }
  }

  return (
    <div
      className={`cursor-pointer rounded-[4px] border-[0.1rem] border-solid ${address.isDefault ? 'border-primary' : 'border-[#e1e3e4]'} self-start bg-white px-4 pb-5`}
    >
      <div className="flex justify-end px-4 py-3">
        <ModalContainer>
          <ModalContainer.Open opens="edit-address">
            <button className="flex items-center gap-2 text-sm text-primary">
              <FiEdit className="h-5 w-5" />
              Edit
            </button>
          </ModalContainer.Open>

          <ModalContainer.Window name="edit-address">
            <AddressForm isModal={true} addressToEdit={address} />
          </ModalContainer.Window>
        </ModalContainer>
      </div>
      <ul className="grid gap-2" onClick={onSubmit}>
        <li className="text-sm font-normal">
          Contact:{' '}
          <span className="text-sm font-light">
            {user.email || address?.email}
          </span>
        </li>
        <li className="text-sm font-normal">
          Name:{' '}
          <span className="text-sm font-light">{`${firstName} ${lastName}`}</span>
        </li>
        <li className="text-sm font-normal">
          Phone: <span className="text-sm font-light">{phone}</span>
        </li>
        <li className="text-sm font-normal">
          Ship to: <span className="text-sm font-light">{streetAddress}</span>
        </li>
      </ul>
    </div>
  );
}

export default CheckoutAddress;
