import { useForm } from 'react-hook-form';
import FormRowVertical from '../ui/FormRowVertical';
import Button from '../ui/Button';

function Contact() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <section className="my-12 space-y-10 text-[#1F1F1F]">
      <h1 className="text-center font-heading text-3xl font-medium">
        Contact Us
      </h1>

      <div className="mx-auto max-w-[700px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormRowVertical label="Name" error={errors?.name?.message}>
              <input
                type="text"
                id="name"
                className={`rounded-3xl border border-solid focus:outline-none ${errors?.name?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
                {...register('name', {
                  required: 'This field is required',
                })}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Email Address"
              error={errors?.email?.message}
            >
              <input
                type="email"
                id="email"
                className={`rounded-3xl border border-solid focus:outline-none ${errors?.email?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
                {...register('email', {
                  required: 'This field is required',
                })}
              />
            </FormRowVertical>
          </div>
          <FormRowVertical label="Address" error={errors?.address?.message}>
            <input
              type="text"
              id="address"
              className={`rounded-3xl border border-solid focus:outline-none ${errors?.address?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('address', {
                required: 'This field is required',
              })}
            />
          </FormRowVertical>
          <FormRowVertical label="Telephone" error={errors?.tel?.message}>
            <input
              type="text"
              id="tel"
              className={`rounded-3xl border border-solid focus:outline-none ${errors?.tel?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'} px-5 py-[10px] font-sans text-sm shadow-sm`}
              {...register('tel', {
                required: 'This field is required',
              })}
            />
          </FormRowVertical>
          <FormRowVertical label="Subject" error={errors?.subject?.message}>
            <select
              className={`rounded-3xl border border-solid ${errors?.subject?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'} px-3 py-[10px] font-sans text-sm shadow-sm focus:outline-none`}
              id="subject"
              // value={sortBy}
              {...register('subject', {
                required: 'This field is required',
              })}
            >
              <option value="product">Select a related subject</option>
              <option value="support">Support</option>
              <option value="sponsorship">Dponsorship</option>
              <option value="dealership">Dealership</option>
              <option value="compliant">Compliant</option>
            </select>
          </FormRowVertical>
          <FormRowVertical label="Message" error={errors?.message?.message}>
            <textarea
              id="message"
              rows="5"
              {...register('message', {
                required: 'This field is required',
              })}
              className={`rounded-3xl border border-solid px-4 py-[10px] font-sans text-inherit focus:outline-none ${errors?.message?.message ? 'border-[#F05D5D]' : 'border-[#a3a3a6]'}`}
            />
          </FormRowVertical>

          <Button additionalClass="self-center px-14">Send Message</Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
