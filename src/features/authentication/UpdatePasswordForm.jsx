import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRowVertical from '../../ui/FormRowVertical';
import { useChangePassword } from './useChangePassword';
import SpinnerButton from '../../ui/SpinnerButton';

function UpdatePasswordForm() {
  const { changePassword, isLoading } = useChangePassword();

  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-7">
        <FormRowVertical
          label="Current Password"
          error={errors?.passwordCurrent?.message}
        >
          <input
            type="password"
            id="passwordCurrent"
            autoComplete="current-password"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('passwordCurrent', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRowVertical>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <FormRowVertical label="New Password" error={errors?.password?.message}>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none disabled:cursor-not-allowed`}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Confirm New Password"
          error={errors?.passwordConfirm?.message}
        >
          <input
            type="password"
            id="passwordConfirm"
            autoComplete="new-password"
            className={`rounded-sm border border-solid border-[#D4D6E1] bg-white px-5 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                getValues().password === value || 'New password needs to match',
            })}
          />
        </FormRowVertical>
      </div>
      <Button additionalClass="self-start" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
}

export default UpdatePasswordForm;
