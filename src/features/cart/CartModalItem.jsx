import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';
import { formatCurrency, sleep } from '../../utils/helpers';
import { removeItem } from './cartSlice';
import SpinnerButton from '../../ui/SpinnerButton';
import AuthContext from '../../auth-context';
import { useDeleteCart } from './useDeleteCart';

function CartModalItem({ item, onCloseModal }) {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const { deleteCart, isDeleting } = useDeleteCart();

  const isLoading = isRemoving || isDeleting;

  // NOTE: 1) cartId is the cart id from the database (used in the database to delete cart)
  //       2) productId is the product id (used in the redux store to delete cart)
  const {
    _id: cartId,
    product: { _id: productId, name, coverImageUrl, slug },
    price,
    quantity,
  } = item;

  async function removeCartAuthHandler() {
    deleteCart(cartId, {
      onSuccess: () => {
        dispatch(removeItem(productId));
      },
    });
  }

  async function removeCartNoAuthHandler() {
    setIsRemoving(true);
    await sleep(2000);

    if (!navigator.onLine) {
      setIsRemoving(false);
      toast.error('Something went wrong. Please try again later', {
        style: {
          background: '#FCE2E2',
          color: '#F05D5D',
          maxWidth: '300px',
        },
      });
      return;
    }
    dispatch(removeItem(productId));
  }

  const removeCartHandler = async () => {
    if (authCtx.isLoggedIn) {
      removeCartAuthHandler();
    } else {
      removeCartNoAuthHandler();
    }
  };

  return (
    <li className="border-[rgba(0, 0, 0, 0.105)] cart-item group relative border-b border-solid transition-all duration-300 hover:bg-stone-100/75">
      <Link
        to={`/product/${slug}`}
        onClick={onCloseModal}
        className="grid grid-cols-[70px_1fr] gap-4 px-[15px] py-4"
      >
        <div className="relative">
          <img
            src={coverImageUrl}
            alt={name}
            className={`w-full ${isLoading && 'opacity-30'}`}
          />
          {isLoading && (
            <span className="absolute left-1/2 top-1/2 inline-block -translate-x-2/4 -translate-y-1/2">
              <SpinnerButton />
            </span>
          )}
        </div>

        <div className="">
          <h3 className="mb-[6px] w-[85%] text-sm font-medium group-hover:text-[#555]">
            {name}
          </h3>
          <div className="text-[0.813rem]">
            <span className="text-[#999]">{quantity} x</span>{' '}
            <span className="font-normal text-primary">
              {formatCurrency(price, 2)}
            </span>
          </div>
        </div>
      </Link>
      <button
        className="absolute right-2 top-3 z-20 p-1 transition-all duration-300 hover:bg-white"
        onClick={removeCartHandler}
        disabled={isLoading}
      >
        <HiXMark className="h-4 w-4 text-[#4b4b4b]" />
      </button>
    </li>
  );
}

export default CartModalItem;
