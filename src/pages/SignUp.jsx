import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormRowVertical from '../ui/FormRowVertical';
import Button from '../ui/Button';
import { useSignup } from '../features/authentication/useSignup';
import { useExportCart } from '../features/cart/useExportCart';
import toast from 'react-hot-toast';
import SpinnerButton from '../ui/SpinnerButton';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useSignup();
  const { exportLocalCart } = useExportCart();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    signUp(data, {
      onSuccess: () => {
        reset();
        exportLocalCart();
        navigate('/');
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            err?.response?.data ||
            'Failed to create user! check your connection or try again later.',
        );
      },
    });
  }

  return (
    <section className="mx-auto my-16 grid max-w-[400px] gap-10">
      <Link to="/" className="inline-block justify-self-center">
        <img src="/logo.png" className=" w-48" alt="playsphere-logo" />
      </Link>

      <div className="grid gap-7 rounded-[3px] border border-[#e1e3e4] p-8 shadow-lg">
        <h1 className="justify-self-center font-heading text-2xl font-semibold">
          Create An Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormRowVertical
            label="First Name"
            error={errors?.firstName?.message}
          >
            <input
              type="text"
              id="firstName"
              className={`rounded-[3px] border border-solid focus:outline-none ${errors?.firstName?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('firstName', {
                required: 'This field is required',
              })}
              placeholder="Your Name"
            />
          </FormRowVertical>
          <FormRowVertical label="Last Name" error={errors?.lastName?.message}>
            <input
              type="text"
              id="lastName"
              className={`rounded-[3px] border border-solid focus:outline-none ${errors?.lastName?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('lastName', {
                required: 'This field is required',
              })}
              placeholder="Your Last Name"
            />
          </FormRowVertical>
          <FormRowVertical label="Email Address" error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              autoComplete="username"
              className={`rounded-[3px] border border-solid focus:outline-none ${errors?.email?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('email', {
                required: 'This field is required',
              })}
              placeholder="name@email.com"
            />
          </FormRowVertical>
          <FormRowVertical label="Password" error={errors?.password?.message}>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className={`rounded-[3px] border border-solid focus:outline-none ${errors?.password?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password should not be less than 8 characters',
                },
              })}
              placeholder="Password"
            />
          </FormRowVertical>
          <FormRowVertical
            label="Confirm Password"
            error={errors?.passwordConfirm?.message}
          >
            <input
              type="password"
              id="passwordConfirm"
              className={`rounded-[3px] border border-solid focus:outline-none ${errors?.passwordConfirm?.message ? 'border-[#F05D5D]' : 'border-[#D4D6E1]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('passwordConfirm', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password should not be less than 8 characters',
                },
              })}
              placeholder="Confirm Password"
            />
          </FormRowVertical>
          <Button variation="secondary" additionalClass="mt-1">
            {isLoading ? <SpinnerButton /> : 'Create an Account'}
          </Button>
        </form>
        <Link
          to="/auth/sign-in"
          className="text-center text-[15px] text-primary"
        >
          Have an account? Login
        </Link>
      </div>
    </section>
  );
}

export default SignUp;
