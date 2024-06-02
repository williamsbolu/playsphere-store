import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { formatCurrency, sleep } from '../../../utils/helpers';
import { useDeleteWishlist } from './useDeleteWishlist';
import SpinnerButton from '../../../ui/SpinnerButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeWishlist } from './wishlistSlice';
import toast from 'react-hot-toast';
import AuthContext from '../../../auth-context';
import { addItem } from '../../cart/cartSlice';
import { useUpdateCart } from '../../cart/useUpdateCart';
import { useCreateCart } from '../../cart/useCreateCart';

function WishListItem({ item }) {
  const authCtx = useContext(AuthContext);
  const { isDeleting, deleteWishlist } = useDeleteWishlist();
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpdating, updateCart } = useUpdateCart();
  const { isCreating, createCart } = useCreateCart();
  const isLoading = isCreating || isUpdating;
  const {
    id,
    slug,
    product: {
      id: productId,
      name,
      originalPrice,
      price,
      quantity: unitQuantity,
      size,
      coverImageUrl,
      discountedValue,
    },
  } = item;

  const soldOut = unitQuantity === 0;
  const existingItem = cartItems.find((item) => item.product._id === productId);

  function removeWishlistHandler() {
    deleteWishlist(id, {
      onSuccess: () => {
        dispatch(removeWishlist(id));
        toast.remove();
        toast.success('Product removed from your wishlist.');
      },
    });
  }

  async function addToCartAuthHandler() {
    if (existingItem) {
      // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
      const totalNewCartQuantity = existingItem.quantity + 1;
      if (totalNewCartQuantity > unitQuantity) {
        toast.error('You have reached the maximum quantity for this product', {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '330px',
          },
        });
        return;
      }

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
                productId,
                name,
                coverImageUrl,
                originalPrice: originalPrice || null,
                price,
                quantity: 1,
                productQuantity: unitQuantity,
                size,
                slug,
              }),
            );
            navigate('/checkout');
          },
        },
      );
    } else {
      createCart(
        { product: productId, price },
        {
          onSuccess: (cart) => {
            dispatch(
              addItem({
                cartId: cart.data.id || existingItem._id,
                userId: cart.data.user,
                productId,
                name,
                coverImageUrl,
                originalPrice: originalPrice || null,
                price,
                quantity: 1,
                productQuantity: unitQuantity,
                size,
                slug,
              }),
            );
            navigate('/checkout');
          },
        },
      );
    }
  }

  const buyNowHandler = async () => {
    if (!authCtx.isLoggedIn) {
      if (!navigator.onLine) {
        await sleep(2000);

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

      await sleep(1000);

      dispatch(
        addItem({
          productId,
          name,
          coverImageUrl,
          originalPrice: originalPrice || null,
          price,
          quantity: 1,
          productQuantity: unitQuantity,
          size,
          slug,
        }),
      );
      navigate('/checkout');
    } else {
      addToCartAuthHandler('isCheckingOut');
    }
  };

  return (
    <div className="flex justify-between rounded-[3px] border border-[#e1e3e4] bg-white px-4 py-4">
      <div className="flex gap-3">
        <Link to={`/product/${slug}`} className="">
          <img src={coverImageUrl} className="h-[100px]" alt={name} />
        </Link>

        <div className="space-y-5 pt-2 text-[0.94rem]">
          <Link
            to={`/product/${slug}`}
            className="text-sm font-semibold uppercase text-body hover:text-primary"
          >
            {name}
          </Link>

          <div className="flex flex-col items-start gap-1">
            <span className="text-ase font-semibold text-primary">
              {formatCurrency(price, 2)}
            </span>
            <div className="space-x-2">
              {originalPrice && (
                <span className="relative inline-block text-sm text-[#4A4A4A]">
                  {formatCurrency(originalPrice)}
                  <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#4A4A4A] font-medium"></span>
                </span>
              )}
              {originalPrice && (
                <span className="relative rounded-md bg-primary/15 p-1 text-sm text-primary">
                  -{discountedValue}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between">
        <Button
          onClick={buyNowHandler}
          variation={!soldOut ? 'primary' : 'soldout'}
          disabled={isLoading || soldOut}
        >
          Buy Now
        </Button>
        <button
          className={`flex h-7 items-center ${isDeleting ? 'gap-2' : 'gap-1'} rounded-md px-2 py-1 text-xs font-normal uppercase text-primary hover:bg-primary/15 disabled:cursor-not-allowed`}
          onClick={removeWishlistHandler}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <SpinnerButton type="primary" size="extra-small" />
          ) : (
            <MdOutlineDeleteOutline className="h-5 w-5" />
          )}
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishListItem;
