import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatCurrency, sleep } from '../../utils/helpers';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth-context';
import { addItem, removeItem, removeItemQuantity } from './cartSlice';
import { useDeleteCart } from './useDeleteCart';
import { useUpdateCart } from './useUpdateCart';
import toast from 'react-hot-toast';
import SpinnerButton from '../../ui/SpinnerButton';

function CartItem({ item }) {
  const authCtx = useContext(AuthContext);
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const dispatch = useDispatch();
  const { updateCart, isUpdating } = useUpdateCart();
  const { deleteCart, isDeleting } = useDeleteCart();
  const {
    _id: cartId,
    product: {
      _id: productId,
      name,
      coverImageUrl,
      quantity: unitQuantity,
      originalPrice,
      slug,
    },
    price,
    quantity,
    itemPriceTotal,
  } = item;

  const isLoading = cartIsLoading || isDeleting || isUpdating;

  useEffect(() => {
    if (!errorQuantity) return;
    const errorTimeout = setTimeout(() => setErrorQuantity(false), 2000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errorQuantity]);

  async function removeCartQuantityNoAuthHandler() {
    if (quantity === 1) return removeCartNoAuthHandler();

    setCartIsLoading(true);
    await sleep(1000);

    if (!navigator.onLine) {
      setCartIsLoading(false);
      toast.error('Something went wrong. Please try again later', {
        style: {
          background: '#FCE2E2',
          color: '#F05D5D',
          maxWidth: '300px',
        },
      });
      return;
    }

    dispatch(removeItemQuantity(productId));
    setCartIsLoading(false);
  }

  function removeCartQuantityAuthHandler() {
    if (quantity === 1) return removeCartHandler();

    updateCart(
      {
        cartId,
        data: { quantity: quantity - 1 },
      },
      {
        onSuccess: () => {
          dispatch(removeItemQuantity(productId));
        },
      },
    );
  }

  function removeCartQuantityHandler() {
    if (authCtx.isLoggedIn) {
      removeCartQuantityAuthHandler();
    } else {
      removeCartQuantityNoAuthHandler();
    }
  }

  async function addItemNoAuthHandler() {
    setCartIsLoading(true);
    await sleep(1000);

    if (!navigator.onLine) {
      setCartIsLoading(false);
      toast.error('Something went wrong. Please try again later', {
        style: {
          background: '#FCE2E2',
          color: '#F05D5D',
          maxWidth: '300px',
        },
      });
      return;
    }

    dispatch(
      addItem({
        productId,
        price,
        quantity: 1,
      }),
    );
    setCartIsLoading(false);
  }

  function addItemHandler() {
    if (quantity >= unitQuantity) {
      setErrorQuantity(true);
      return;
    }

    if (authCtx.isLoggedIn) {
      updateCart(
        {
          cartId,
          data: { quantity: quantity + 1 },
        },
        {
          onSuccess: () => {
            dispatch(
              addItem({
                productId,
                price,
                quantity: 1,
              }),
            );
          },
        },
      );
    } else {
      addItemNoAuthHandler();
    }
  }

  async function removeCartNoAuthHandler() {
    setCartIsLoading(true);
    await sleep(1000);

    if (!navigator.onLine) {
      setCartIsLoading(false);
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
    setCartIsLoading(false);
  }

  function removeCartHandler() {
    if (authCtx.isLoggedIn) {
      deleteCart(cartId, {
        onSuccess: () => {
          dispatch(removeItem(productId));
        },
      });
    } else {
      removeCartNoAuthHandler();
    }
  }

  return (
    <tr className="cart relative">
      <td className="px-7 py-6">
        <div className="flex items-center gap-5">
          <div>
            <img
              src={coverImageUrl}
              className="h-[90px] w-[90px] object-contain"
              alt={name}
            />
          </div>
          <div>
            <Link
              to={`/product/${slug}`}
              className="inline-block text-[13px] font-bold uppercase text-body transition-all duration-300 hover:text-primary"
            >
              {name}
            </Link>
            <div className="mt-1">
              <span className="text-sm font-semibold text-primary">
                {formatCurrency(price, 2)}
              </span>
              {originalPrice && (
                <span className="relative ml-3 inline-block text-[13px] font-semibold text-black">
                  {formatCurrency(originalPrice, 2)}
                  <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#000000B3]"></span>
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-7 py-6">
        <div className="flex flex-col items-center gap-[6px]">
          <div className="flex h-10 w-24 items-center rounded-[3px] border border-solid border-[#e7e2de]">
            <button
              className="h-full w-1/3 rounded-s-[3px] border-r border-solid border-[#e7e2de] text-xl text-[#666] hover:bg-primary hover:text-white"
              onClick={removeCartQuantityHandler}
            >
              -
            </button>
            <span className="flex-1 text-center text-sm">{quantity}</span>
            <button
              className="h-full w-1/3 rounded-e-[3px] border-l border-solid border-[#e7e2de] text-lg text-[#666] hover:bg-primary hover:text-white"
              onClick={addItemHandler}
            >
              +
            </button>
          </div>
          {errorQuantity && (
            <p className="text-[13px] text-[#D0021B]">
              Only {quantity} items left
            </p>
          )}
          <button
            className="inline-block text-[0.813rem] transition-all duration-300 hover:text-primary"
            onClick={removeCartHandler}
          >
            Remove
          </button>
        </div>
      </td>
      <td className="px-7 py-6">
        <div className="text-right">
          <span className="text-sm font-medium">
            {formatCurrency(itemPriceTotal, 2)}
          </span>
        </div>
      </td>
      {isLoading && (
        <td className="absolute left-0 top-0 h-full w-full cursor-not-allowed bg-[#fff] opacity-60">
          <span className="absolute left-1/2 top-1/2 inline-block -translate-x-2/4 -translate-y-1/2">
            <SpinnerButton type="dark" />
          </span>
        </td>
      )}
    </tr>
  );
}

export default CartItem;
