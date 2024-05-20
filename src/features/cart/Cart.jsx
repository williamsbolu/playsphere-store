import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { BsCart4 } from 'react-icons/bs';

import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { Link } from 'react-router-dom';

function Cart() {
  const cart = useSelector((state) => state.cart);

  const savedSum = cart.products.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.price) * item.quantity;
    }
    return sum + 0;
  }, 0);

  return (
    <section className="app-container py-10 text-black">
      {cart.products.length > 0 && (
        <div className="mb-10">
          <h1 className="text-body font-heading text-3xl font-medium">
            My cart
          </h1>
        </div>
      )}

      {cart.products.length > 0 && (
        <div className="grid grid-cols-[2fr_1fr] gap-7">
          <div className="h-auto overflow-auto">
            <div className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white">
              <table className="w-full">
                <thead className="border-b border-solid border-[#e1e3e4]">
                  <tr>
                    <th className="px-[1.88rem] py-[0.94rem] text-left text-sm font-medium">
                      Product
                    </th>
                    <th className="px-[1.88rem] py-[0.94rem] text-center text-sm font-medium">
                      Quantity
                    </th>
                    <th className="px-[1.88rem] py-[0.94rem] text-right text-sm font-medium">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.products.map((cart) => (
                    <CartItem key={cart.product._id} item={cart} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-auto self-start overflow-y-auto rounded-[3px] border border-solid border-[#e1e3e4] bg-white px-7 py-6">
            <div className="border-b border-solid border-[#e1e3e4] pb-6">
              <div className="text-body mb-3 flex items-center justify-between">
                <h2 className="text-[19px] font-semibold">Total</h2>
                <span className="text-[19px] font-semibold">
                  {formatCurrency(cart.totalAmount, 2)}
                </span>
              </div>
              <span className="text-base font-semibold text-primary">
                You saved {formatCurrency(savedSum, 2)}!
              </span>
            </div>

            <div className="grid gap-6 pt-7">
              <p className="text-base">
                Tax included.{' '}
                <Link
                  to="/policies/shipping-policy"
                  className="text-primary underline underline-offset-4"
                >
                  Shipping
                </Link>{' '}
                calculated at checkout
              </p>

              <Button to="/checkout" type="link">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      {cart.products.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="mb-1">
            <BsCart4 className="h-[85px] w-[85px] text-black" />
          </div>
          <h1 className="font-heading text-[1.75rem] font-medium">
            Your cart is empty
          </h1>
          <p className="text-[0.938rem]">
            Spend more than 49,999NGN to get free shipping!
          </p>
          <Button to="/product-category/deals" type="link">
            Shop our products
          </Button>
        </div>
      )}
    </section>
  );
}

export default Cart;
