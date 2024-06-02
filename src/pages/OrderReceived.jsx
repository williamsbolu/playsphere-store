import { format } from 'date-fns';
import { useOrder } from '../features/checkout/useOrder';
import ErrorPage from '../ui/ErrorPage';
import SpinnerFull from '../ui/SpinnerFull';
import { formatCurrency } from '../utils/helpers';

function OrderReceived() {
  const { isLoading, order, error, refetch } = useOrder();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  const {
    _id: id,
    totalAmount,
    paymentMethod,
    deliveryFees,
    createdAt,
    products,
  } = order.data;

  const subTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  return (
    // max-w-[800px] replace after updating the orderId logic
    <section className="mx-auto max-w-5xl space-y-16 pb-16 pt-10 text-body">
      <div className="space-y-7">
        <div className="rounded-xl border-[2px] border-dashed border-[#7A9659] py-6">
          <p className="text-center text-xl font-semibold text-[#7A9659]">
            Thank you. Your order has been received.
          </p>
        </div>

        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center gap-3 border-r border-[#0000001a]">
            <p>Order number:</p>
            <p className="font-medium uppercase text-black">{id}</p>
          </div>
          <div className="flex flex-col items-center gap-3 border-r border-[#0000001a]">
            <p>Date:</p>
            <p className="font-medium text-black">
              {format(new Date(createdAt), 'MMM dd yyyy')}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 border-r border-[#0000001a]">
            <p>Total:</p>
            <p className="font-medium text-black">
              {formatCurrency(totalAmount, 2)}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>Payment method:</p>
            <p className="font-medium capitalize text-black">{paymentMethod}</p>
          </div>
        </div>

        <div className="text-[15px]">
          <p className="uppercase leading-7">Access bank</p>
          <p>0031953471</p>
          <p className="uppercase leading-7">Playsphere Global Resources</p>

          <p className="mt-5">
            Once again, thank you for Purchasing from Playsphere. We really
            appreciate you as one of our esteem Customer…
          </p>
          <p>
            Follow us on Facebook, Instagram: @playsphere and Twitter
            @playsphere-co for game updates and new releases…
          </p>
        </div>
      </div>

      <div className="space-y-7">
        <div className="">
          <h2 className="mb-1 text-xl font-semibold uppercase text-black">
            Our Bank Details
          </h2>
          <h3 className="text-[15px] font-semibold uppercase">
            Playsphere Global Resources:
          </h3>
        </div>

        <div className="grid grid-cols-2 text-[15px]">
          <div className="flex flex-col items-center gap-3 border-r border-[#0000001a]">
            <p>Bank:</p>
            <p className="font-semibold uppercase text-black">Access Bank</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>Account number:</p>
            <p className="font-semibold text-black">0031953471</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 font-semibold text-black">
        <h2 className="mb-1 text-xl uppercase">Order details</h2>

        <ul className="text-[15px]">
          <li className="flex justify-between border-b-[2px] border-[#0000001a] py-4 uppercase">
            <h3 className="">Product</h3>
            <span className="">Total</span>
          </li>

          {products.map((item) => (
            <li
              key={item._id}
              className="flex justify-between border-b border-[#0000001a] py-4"
            >
              <p className="text-sm uppercase">
                {item.product.name}
                <span className="ml-2 text-[#777]">× {item.quantity}</span>
              </p>
              <p className="text-primary">{formatCurrency(item.price, 2)}</p>
            </li>
          ))}
          <li className="flex justify-between border-b border-[#0000001a] py-4">
            <p className="">Subtotal:</p>
            <p className="text-primary">{formatCurrency(subTotal, 2)}</p>
          </li>
          <li className="flex justify-between border-b border-[#0000001a] py-4">
            <p>Shipping:</p>
            <p className="text-primary">
              {formatCurrency(deliveryFees, 2)}
              <span className="ml-1 text-xs text-[#777]">via Shipping Fee</span>
            </p>
          </li>
          <li className="flex justify-between border-b border-[#0000001a] py-4">
            <p>Payment method:</p>
            <p className="font-normal capitalize text-body">{paymentMethod}</p>
          </li>
          <li className="flex justify-between border-b border-[#0000001a] py-4">
            <h2 className="text-xl uppercase">Total:</h2>
            <p className="text-xl text-primary">
              {formatCurrency(totalAmount, 2)}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default OrderReceived;
