import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IoMdArrowBack } from 'react-icons/io';
import FormRowVertical from '../../../ui/FormRowVertical';
import { useUser } from '../../authentication/useUser';
import Button from '../../../ui/Button';
import { useUpdateAddress } from './useUpdateAddress';
import { useCreateAddress } from './useCreateAddress';
import SpinnerButton from '../../../ui/SpinnerButton';
import AuthContext from '../../../auth-context';
import { sleep } from '../../../utils/helpers';
import { generateRandomNumericID } from '../../../utils/generateRandomNumericID';
import { useDispatch } from 'react-redux';
import { addAddress, updateUserAddress } from './addressSlice';

function AddressForm({
  onRemoveForm,
  isAddingDefault = false,
  addressToEdit = {},
  isModal = false,
  isCheckout = false,
  onCloseModal,
}) {
  const authCtx = useContext(AuthContext);
  const [isDefaultValue, setIsDefaultValue] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const { createAddress, isCreating } = useCreateAddress();
  const { updateAddress, isUpdating } = useUpdateAddress();
  const dispatch = useDispatch();

  const { _id: editId, isDefault, ...editValues } = addressToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isDefaultValue) data.isDefault = isDefaultValue;

    // when we want to force a default address
    if (isAddingDefault) data.isDefault = true;

    if (isEditSession) {
      updateAddress(
        { addressId: editId, data },
        {
          onSuccess: () => {
            toast.success('Delivery Address updated successfully!');
            onRemoveForm?.();
            onCloseModal?.(); // for modal
            queryClient.invalidateQueries(['address']);
          },
        },
      );
    } else
      createAddress(data, {
        onSuccess: (data) => {
          toast.success('New Delivery Address saved successfully!');
          onRemoveForm?.();
          onCloseModal?.();
          queryClient.invalidateQueries(['address']);
        },
      });
  }

  // This function is primarily for offline caching of user address info.
  async function onSubmitNoAuth(data) {
    if (isEditSession) {
      data._id = editId;
      setIsSaving(true);
      await sleep(1000);
      dispatch(updateUserAddress(data));
      setIsSaving(false);
      onCloseModal?.();
    } else {
      const id = generateRandomNumericID();
      data._id = id;
      if (isAddingDefault) data.isDefault = true;
      setIsSaving(true);
      await sleep(1000);

      dispatch(addAddress(data));

      setIsSaving(false);
    }
  }

  const submitFormHandler = (data) => {
    if (authCtx.isLoggedIn) {
      onSubmit(data);
    } else {
      onSubmitNoAuth(data);
    }
  };

  const isLoading = isCreating || isUpdating || isSaving;
  const formButtonText = isEditSession ? 'Save Changes' : 'Continue';
  const displayBackButtonState = !isModal && !isCheckout;

  return (
    <div
      className={`${isModal && 'w-[700px] px-5 py-4'} ${isCheckout && 'pr-5'} space-y-6`}
    >
      <div className="flex gap-5">
        {displayBackButtonState && (
          <button onClick={onRemoveForm}>
            <IoMdArrowBack className="h-5 w-5" />
          </button>
        )}
        <h1 className="font-heading text-xl font-medium capitalize text-black">
          {isEditSession ? 'Edit' : 'Add'} delivery address
        </h1>
      </div>
      <form className="grid gap-5" onSubmit={handleSubmit(submitFormHandler)}>
        <FormRowVertical label="Email Address" error={errors?.email?.message}>
          <input
            type="email"
            id="userEmail"
            defaultValue={user?.email || ''}
            className={`grow rounded-[3px] border border-solid ${errors?.email?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('email', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
        {!isDefault && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="default"
              className="h-4 w-4 accent-stone-700"
              onChange={() => setIsDefaultValue((prevState) => !prevState)}
            />
            <label htmlFor="default" className="text-sm text-[#666666]">
              Set as default
            </label>
          </div>
        )}
        <div className="grid grid-cols-2 gap-5">
          <FormRowVertical
            label="First name"
            error={errors?.firstName?.message}
          >
            <input
              type="text"
              id="firstName"
              className={`grow rounded-[3px] border border-solid ${errors?.firstName?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
              {...register('firstName', {
                required: 'This field is required',
              })}
            />
          </FormRowVertical>
          <FormRowVertical label="Last Name" error={errors?.lastName?.message}>
            <input
              type="text"
              id="lastName"
              className={`grow rounded-[3px] border border-solid ${errors?.lastName?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
              {...register('lastName', {
                required: 'This field is required',
              })}
            />
          </FormRowVertical>
        </div>
        <FormRowVertical label="Phone Number" error={errors?.phone?.message}>
          <input
            type="text"
            id="phone"
            className={`grow rounded-[3px] border border-solid ${errors?.phone?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('phone', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Street Address"
          error={errors?.streetAddress?.message}
        >
          <input
            type="text"
            id="streetAddress"
            className={`grow rounded-[3px] border border-solid ${errors?.streetAddress?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('streetAddress', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Directions (Optional)"
          error={errors?.directions?.message}
        >
          <input
            type="text"
            id="directions"
            className={`grow rounded-[3px] border border-solid ${errors?.directions?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('directions')}
          />
        </FormRowVertical>
        <FormRowVertical label="State" error={errors?.state?.message}>
          <select
            className={`rounded-[3px] border border-solid ${errors?.state?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-3 py-[11px] font-sans text-sm shadow-sm focus:outline-none`}
            id="state"
            {...register('state', {
              required: 'This field is required',
            })}
          >
            <option value="" selected disabled>
              Select an option...
            </option>
            <option value="lagos">lagos</option>
            <option value="abuja">abuja</option>
            <option value="rivers">rivers</option>
            <option value="ogun">ogun</option>
          </select>
        </FormRowVertical>
        <FormRowVertical label="City" error={errors?.city?.message}>
          <input
            type="text"
            id="city"
            className={`grow rounded-[3px] border border-solid ${errors?.city?.message ? 'border-[#F05D5D]' : 'border-[#d4d6d8]'} px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('city', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>

        <Button>{isLoading ? <SpinnerButton /> : formButtonText}</Button>
      </form>
    </div>
  );
}

export default AddressForm;
