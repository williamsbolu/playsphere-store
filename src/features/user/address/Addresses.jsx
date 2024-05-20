import { useState } from 'react';
import ErrorPage from '../../../ui/ErrorPage';
import SpinnerFull from '../../../ui/SpinnerFull';
import AddressForm from './AddressForm';
import { useAddress } from './useAddress';
import Address from './Address';

function Addresses() {
  const { isLoading, data, error, refetch } = useAddress();
  const [addingAddress, setAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState({
    isEditing: false,
    editValue: {},
  });

  const removeAddAddressDisplayHandler = () => setAddingAddress(false);

  const addEditAddressDisplayHandler = (editValue) => {
    setEditingAddress({ isEditing: true, editValue });
  };
  const removeEditAddressDisplayHandler = () =>
    setEditingAddress({ isEditing: false, editValue: {} });

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  return (
    <div>
      {!addingAddress && !editingAddress.isEditing && (
        <div className="flex justify-between">
          <h1 className="text-body font-heading text-xl font-medium">
            Delivery Address
          </h1>
          <button
            className={`rounded-3xl bg-primary px-4 py-2 text-xs font-medium capitalize text-white transition-all duration-200 disabled:cursor-not-allowed`}
            onClick={() => setAddingAddress(true)}
          >
            Add address
          </button>
        </div>
      )}
      {addingAddress && (
        <AddressForm onRemoveForm={removeAddAddressDisplayHandler} />
      )}
      {!addingAddress && !editingAddress.isEditing && data.length > 0 && (
        <ul className="my-7 grid grid-cols-2 gap-5">
          {data.map((address) => (
            <Address
              key={address._id}
              address={address}
              onEditAddress={addEditAddressDisplayHandler}
            />
          ))}
        </ul>
      )}
      {editingAddress.isEditing && (
        <AddressForm
          addressToEdit={editingAddress.editValue}
          onRemoveForm={removeEditAddressDisplayHandler}
        />
      )}
    </div>
  );
}

export default Addresses;
