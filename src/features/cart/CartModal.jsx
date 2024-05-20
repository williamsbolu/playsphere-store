import { useSelector } from 'react-redux';
import { HiXMark } from 'react-icons/hi2';
import CartModalItem from './CartModalItem';
import { formatCurrency } from '../../utils/helpers';
import { BsCartX } from 'react-icons/bs';
import Button from '../../ui/Button';

function CartModal({ onCloseModal }) {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <div className="border-[rgba(0, 0, 0, 0.105)] flex items-center justify-between border-b border-solid px-[15px] py-5 text-[#1F1F1F]">
        <h2 className="font-heading text-xl font-semibold">Shopping cart</h2>

        <button className="flex items-center" onClick={onCloseModal}>
          <HiXMark className="mr-1 h-[22px] w-[22px]" />
          <span className="text-sm font-normal">Close</span>
        </button>
      </div>

      {cart.products.length > 0 && (
        <ul className="cart overflow-auto">
          {cart.products.map((cart) => (
            <CartModalItem
              key={cart.product._id}
              item={cart}
              onCloseModal={onCloseModal}
            />
          ))}
        </ul>
      )}

      {cart.products.length === 0 && (
        <div className="flex flex-col items-center gap-5 py-8">
          <BsCartX className="h-20 w-20 opacity-[0.07]" />
          <p className="text-[0.94rem] font-medium text-[#1F1F1F]">
            No products in the cart.
          </p>

          <Button
            type="link"
            to="/product-category/deals"
            onClick={onCloseModal}
          >
            Return To Shop
          </Button>
        </div>
      )}

      {cart.products.length > 0 && (
        <div className="border-[rgba(0, 0, 0, 0.105)] grid border border-t border-solid px-[15px] pb-6">
          <div className="flex items-center justify-between py-4">
            <p className="font-heading text-[18px] font-semibold text-[#1F1F1F]">
              Subtotal:
            </p>
            <span className="text-[18px] font-bold text-primary">
              {formatCurrency(cart.totalAmount, 2)}
            </span>
          </div>
          <Button
            type="link"
            to="/cart"
            additionalClass="mb-[10px]"
            onClick={onCloseModal}
          >
            View cart
          </Button>
          <Button type="link" to="/checkout" onClick={onCloseModal}>
            Checkout
          </Button>
        </div>
      )}
    </>
  );
}

export default CartModal;
