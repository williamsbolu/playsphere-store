import { RiDeleteBinLine } from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import { PiPhoneLight } from 'react-icons/pi';
import { HiOutlineUser } from 'react-icons/hi2';
import { FiEdit } from 'react-icons/fi';
import { useDeleteAddress } from './useDeleteAddress';
import ModalContainer from '../../../ui/ModalContainer';
import ConfirmDelete from '../../../ui/ConfirmDelete';

function Address({ address, onEditAddress }) {
  const { deleteAddress, isDeleting } = useDeleteAddress();
  const {
    _id: addressId,
    firstName,
    lastName,
    phone,
    streetAddress,
    isDefault,
  } = address;

  return (
    <li className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white">
      <div
        className={`flex ${isDefault ? 'justify-between' : 'justify-end'} gap-5 border-b border-[#e1e3e4] px-4 py-2`}
      >
        {isDefault && (
          <span className="text-sm text-[#ffc900]">Default Address</span>
        )}

        <div className="flex gap-5">
          <ModalContainer>
            <ModalContainer.Open opens="delete">
              <button className="flex items-center gap-2 text-sm text-[#777]">
                <RiDeleteBinLine className="h-4 w-4" />
                Delete
              </button>
            </ModalContainer.Open>

            <ModalContainer.Window name="delete">
              <ConfirmDelete
                resourceName="address"
                disabled={isDeleting}
                onConfirm={() => deleteAddress(addressId)}
              />
            </ModalContainer.Window>
          </ModalContainer>
          <button
            className="flex items-center gap-2 text-sm text-primary"
            onClick={() => onEditAddress(address)}
          >
            <FiEdit className="h-5 w-5" />
            Edit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[30px_1fr] gap-y-4 px-2 py-4">
        <HiOutlineUser className="text-[#ffc900]" />
        <p className="text-sm text-[#4A4A4A]">
          {firstName} {lastName}
        </p>
        <SlLocationPin className="text-[#ffc900]" />
        <p className="text-sm text-[#4A4A4A]">{streetAddress}</p>
        <PiPhoneLight className="text-[#ffc900]" />
        <p className="text-[13px] text-[#4A4A4A]">{phone}</p>
      </div>
    </li>
  );
}

export default Address;
