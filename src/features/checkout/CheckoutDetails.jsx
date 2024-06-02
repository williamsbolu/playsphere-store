import { formatCurrency } from '../../utils/helpers';
import { calculateShipping } from '../../utils/helpers';
import CheckoutCarts from './CheckoutCarts';

function CheckoutDetails({ cart }) {
  const shipping = calculateShipping(cart);

  return (
    <div className="self-start rounded-[3px] border border-solid border-[#e1e3e4] bg-white">
      <h3 className="border-b border-solid border-[#e1e3e4] px-4 py-2 font-heading text-lg font-medium text-body">
        My Order
      </h3>

      <div className="border-b border-solid border-[#e1e3e4] px-4 py-1">
        <ul className="">
          {cart.products.map((item) => (
            <CheckoutCarts key={item.product._id} item={item} />
          ))}
        </ul>
      </div>

      <div className="px-4 pb-4 pt-5">
        <div className="space-y-3">
          <span className="text-base">Discount code</span>
          <form>
            <div className="flex items-center rounded-[3px] border border-[#D4D6E1]">
              <input
                type="search"
                className="grow rounded-[3px] border-solid px-5 py-[10px] font-sans text-sm shadow-sm placeholder:font-sans placeholder:text-[14px] placeholder:text-stone-500 focus:outline-none"
                placeholder="Enter your code"
              />
              <button className="self-stretch rounded-e-[3px] bg-primary px-5 text-sm text-white">
                Apply
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-y-3 py-5">
          <p className="text-base">Cart Subtotal</p>
          <span className="justify-self-end">
            {formatCurrency(cart.totalAmount, 2)}
          </span>

          <p className="text-base">Shipping</p>
          <span className="justify-self-end text-primary">
            {formatCurrency(shipping, 2)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-solid border-[#e1e3e4] pt-[10px]">
          <h2 className="text-lg font-medium">Total</h2>
          <span className="text-lg font-semibold text-body">
            {formatCurrency(cart.totalAmount, 2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetails;
