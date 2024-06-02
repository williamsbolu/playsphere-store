import { FaClipboardCheck } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa6';
import { FaClipboardUser } from 'react-icons/fa6';

function VerifySuccess({ email, shippingInfo, paymentMethod }) {
  return (
    <section className="app-container py-16">
      <div className="flex items-center justify-center gap-4">
        <FaClipboardCheck className="h-20 w-20 text-primary" />
        <h1 className="font-heading text-2xl font-semibold">
          Thank you playsphere!
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-6xl space-y-16">
        <div className=" space-y-5">
          <div className="flex items-center gap-4">
            <span className="inline-block -rotate-[15deg] rounded-full bg-gradient-to-br from-[#818181] to-black p-4">
              <BsFillCartCheckFill className="h-7 w-7 text-white" />
            </span>
            <h3 className="text-xl font-semibold">Your order is received</h3>
          </div>
          <div className=" text-[#677279]">
            <p>Thanks for ordering from playsphere.</p>
            <p>
              You will receive an email with your order information once
              confirmed. Your order will be shipped and delivered in 2-5
              business days.
            </p>
            <p>Please wait patiently.</p>
          </div>
        </div>
        <div className=" space-y-5">
          <div className="flex items-center gap-4">
            <span className="inline-block -rotate-[15deg] rounded-full bg-gradient-to-br from-[#818181] to-black p-4">
              <FaBox className="h-7 w-7 text-white" />
            </span>
            <h3 className="text-xl font-semibold">Order updates</h3>
          </div>
          <div className=" text-[#677279]">
            <p>You'll get shipping and delivery updates by email.</p>{' '}
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="inline-block -rotate-[15deg] rounded-full bg-gradient-to-br from-[#818181] to-black p-4">
              <FaClipboardUser className="h-7 w-7 text-white" />
            </span>
            <h3 className="text-xl font-semibold">Customer information</h3>
          </div>
          <div className=" grid grid-cols-2 gap-y-4 text-[#677279]">
            <p>Customer information: {email}</p>
            {shippingInfo && <p>Shipping address: {shippingInfo}</p>}
            <p>Shippind method: 3-7 working days(Standard Shipping)</p>
            {paymentMethod && (
              <p className="capitalize">Payment method: {paymentMethod}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifySuccess;
