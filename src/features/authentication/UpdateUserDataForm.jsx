import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRowVertical from '../../ui/FormRowVertical';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: user,
  });
  const { errors } = formState;

  function onSubmit({ firstName, lastName }) {
    console.log({ ...user, firstName, lastName });
    updateUser(
      { firstName, lastName },
      {
        onSuccess: () => {
          reset({ ...user, firstName, lastName });
        },
      },
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-7">
        <FormRowVertical label="First Name" error={errors?.firstName?.message}>
          <input
            type="text"
            id="firstName"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm placeholder:opacity-60 focus:outline-none`}
            placeholder="Enter First Name"
            {...register('firstName', {
              required: 'This field is required',
              minLength: {
                value: 4,
                message: 'Your name must have at least 4 characters',
              },
            })}
          />
        </FormRowVertical>
        <FormRowVertical label="Last Name" error={errors?.lastName?.message}>
          <input
            type="text"
            id="lastName"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm placeholder:opacity-60 focus:outline-none`}
            placeholder="Enter Last Name"
            {...register('lastName', {
              required: 'This field is required',
              minLength: {
                value: 4,
                message: 'Your name must have at least 4 characters',
              },
            })}
          />
        </FormRowVertical>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <FormRowVertical label="Email Address" error={errors?.email?.message}>
          <input
            type="email"
            id="email"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm placeholder:opacity-60 focus:outline-none disabled:cursor-not-allowed`}
            {...register('email', {
              required: 'This field is required',
            })}
            disabled
          />
        </FormRowVertical>
        <FormRowVertical label="Phone Number">
          <input
            type="tel"
            id="phoneNumber"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm placeholder:opacity-60 focus:outline-none`}
          />
        </FormRowVertical>
      </div>
      <Button additionalClass="self-start" disabled={isUpdating}>
        {isUpdating ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
}

export default UpdateUserDataForm;
