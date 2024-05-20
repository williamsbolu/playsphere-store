import { IoAdd } from 'react-icons/io5';
import ModalContainer from '../../ui/ModalContainer';
import AddressForm from '../user/address/AddressForm';
import CheckoutAddress from './CheckoutAddress';
import { useContext } from 'react';
import AuthContext from '../../auth-context';

function CheckoutAddressList({ data }) {
  const authCtx = useContext(AuthContext);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-normal capitalize">
          {data?.length > 1 ? 'Select shipping address' : 'Shipping Address'}
        </h3>

        <ModalContainer>
          <ModalContainer.Open opens="add-address">
            <button
              className="rounded-full border-[0.1rem] border-solid border-[#1F1F1F] disabled:cursor-not-allowed"
              disabled={!authCtx.isLoggedIn}
            >
              <IoAdd className="h-5 w-5" />
            </button>
          </ModalContainer.Open>
          <ModalContainer.Window name="add-address" type="form">
            <AddressForm isModal={true} isAddingDefault={true} />
          </ModalContainer.Window>
        </ModalContainer>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {data.map((address) => (
          <CheckoutAddress key={address._id} address={address} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutAddressList;
