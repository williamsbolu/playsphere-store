import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import { useExportCart } from '../cart/useExportCart';
import Button from '../../ui/Button';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerButton from '../../ui/SpinnerButton';

function AuthFormModal({ onCloseModal }) {
  const [error, setError] = useState(null);
  const { login, isLoading } = useLogin();
  const { exportLocalCart } = useExportCart();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    setError(null);

    login(data, {
      onSuccess: () => {
        onCloseModal();
        reset();
        exportLocalCart();
      },
      onError: (err) => {
        setError(
          err?.response?.data?.message ||
            err?.response?.data ||
            'Failed to login user! check your connection or try again later.',
        );
      },
    });
  }

  return (
    <>
      <div className="border-[rgba(0, 0, 0, 0.105)] flex items-center justify-between border-b border-solid px-[15px] py-5 text-[#1F1F1F]">
        <h2 className="font-heading text-xl font-semibold">Login</h2>

        <button className="flex items-center" onClick={onCloseModal}>
          <HiXMark className="mr-1 h-[22px] w-[22px]" />
          <span className="text-sm font-normal">Close</span>
        </button>
      </div>

      <div>
        <form
          className="text[#1F1F1F] grid gap-5 px-5 pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <div className="bg-[#FCE2E2] px-3 py-2 text-sm text-[#F05D5D]">
              {error}
            </div>
          )}
          <FormRowVertical label="Email Address" error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className={`grow rounded-[3px] border border-solid focus:outline-none ${errors?.email?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('email', {
                required: 'This field is required',
              })}
            />
          </FormRowVertical>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm text-[#1F1F1F]">
                Password
                <span className="font-medium text-[#FD353F]">*</span>
              </label>
              <Link
                to="/"
                className="text-xs font-normal text-primary underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className={`grow rounded-[3px] border border-solid focus:outline-none ${errors?.password?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be atleast 8 characters',
                },
              })}
            />
            {errors?.password?.message && (
              <span className="text-sm text-[#F05D5D]">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <Button variation="secondary" disabled={isLoading}>
            {isLoading ? <SpinnerButton /> : 'Log in'}
          </Button>
        </form>
      </div>

      <div className="border-[rgba(0, 0, 0, 0.105)] border-t border-solid py-5 text-center">
        <Link
          to="/auth/sign-up"
          className="text-[0.94rem] text-primary hover:underline"
          onClick={onCloseModal}
        >
          Don’t have an account? Sign Up
        </Link>
      </div>
    </>
  );
}

export default AuthFormModal;
