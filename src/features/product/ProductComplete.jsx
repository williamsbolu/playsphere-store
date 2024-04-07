import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCart } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { addItem, updateChange } from '../cart/cartSlice';
import { formatCurrency, sleep } from '../../utils/helpers';
import SpinnerButton from '../../ui/SpinnerButton';
import AuthContext from '../../auth-context';
import { useCreateCart } from '../cart/useCreateCart';
import { useUpdateCart } from '../cart/useUpdateCart';

function ProductComplete({ product }) {
  const authCtx = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const { createCart, isCreating } = useCreateCart();
  const { updateCart, isUpdating } = useUpdateCart();

  const isLoading = isAdding || isCreating || isUpdating;

  const {
    id,
    discountedValue,
    coverImageUrl,
    name,
    price,
    originalPrice,
    slug,
  } = product;

  async function addToCartAuthHandler() {
    const existingItem = cartItems.find((item) => item.product._id === id);

    if (existingItem) {
      updateCart(
        {
          cartId: existingItem._id,
          data: { quantity: existingItem.quantity + 1 },
        },
        {
          onSuccess: (cart) => {
            dispatch(
              addItem({
                cartId: cart.data.id || existingItem._id,
                userId: cart.data.user,
                productId: id,
                name,
                coverImageUrl,
                price,
                quantity: 1,
                slug,
              }),
            );
            dispatch(updateChange());
          },
        },
      );
    } else {
      createCart(
        { product: id, price },
        {
          onSuccess: (cart) => {
            console.log(cart);
            dispatch(
              addItem({
                cartId: cart.data.id || existingItem._id,
                userId: cart.data.user,
                productId: id,
                name,
                coverImageUrl,
                price,
                quantity: 1,
                slug,
              }),
            );
            dispatch(updateChange());
          },
        },
      );
    }
  }

  async function addToCartNoAuthHandler() {
    if (!navigator.onLine) {
      setIsAdding(true);
      await sleep(2000);
      setIsAdding(false);

      toast.error(
        'Failed to add requested item to cart, please try again later',
        {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '300px',
          },
        },
      );
      return;
    }

    setIsAdding(true);
    await sleep(1000);

    dispatch(
      addItem({
        productId: id,
        name,
        coverImageUrl,
        price,
        quantity: 1,
        slug,
      }),
    );
    setIsAdding(false);
    dispatch(updateChange());
  }

  const addToCartHandler = () => {
    if (!authCtx.isLoggedIn) {
      addToCartNoAuthHandler();
    } else {
      addToCartAuthHandler();
    }
  };

  // product-item-complete: normal custom css styles (not tailwind)
  return (
    <div className="group/product product-item-complete relative grid grid-rows-[250px_1fr] gap-3 border border-[#e7e2de] border-y-[#e7e2de7e] border-r-[#e7e2de7e] px-4 py-5 text-[#1F1F1F]">
      {originalPrice && (
        <span className="absolute top-[10px] z-10 rounded-e-xl bg-primary px-3 py-[2px] text-[12px] font-medium text-white">
          Save {discountedValue}%
        </span>
      )}

      <button className="invisible absolute right-2 top-2 z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-slate-400/55 opacity-0 transition-all duration-700 hover:bg-primary group-hover/product:visible group-hover/product:opacity-100">
        <FaHeart className="h-[14px] w-[14px] text-white" />
      </button>

      <Link to={`/product/${slug}`} className="block">
        <img
          src={coverImageUrl}
          className="block h-full w-full object-contain transition-all duration-700 group-hover/product:scale-105"
          alt={name}
        />
      </Link>

      <div className="grid gap-3">
        <div className="space-y-2 px-1">
          <Link
            to={`/product/${slug}`}
            className="block text-sm font-medium transition-all duration-300 hover:text-primary"
          >
            {name}
          </Link>

          <span className="inline-block text-base font-medium text-primary">
            {formatCurrency(price)}
          </span>

          {originalPrice && (
            <span className="relative ml-3 inline-block text-xs">
              {formatCurrency(originalPrice)}
              <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#000000B3] font-medium"></span>
            </span>
          )}
        </div>

        <button
          className="group/button relative flex flex-col items-center self-end justify-self-stretch overflow-hidden rounded-3xl bg-primary py-[9px] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#101010] disabled:cursor-not-allowed"
          onClick={addToCartHandler}
          disabled={isLoading}
        >
          {!isLoading && (
            <PiShoppingCart className="absolute h-6 w-6 -translate-y-[150%] text-center text-white transition-all duration-200 group-hover/button:-translate-y-[2px]" />
          )}
          {!isLoading && (
            <span className="inline-block transition-all duration-200 group-hover/button:translate-y-[150%]">
              Add to cart
            </span>
          )}
          {isLoading && <SpinnerButton type="white" />}
        </button>
      </div>
    </div>
  );
}

export default ProductComplete;
