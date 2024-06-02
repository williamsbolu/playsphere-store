import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCart } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { addItem } from '../cart/cartSlice';
import { formatCurrency, sleep } from '../../utils/helpers';
import SpinnerButton from '../../ui/SpinnerButton';
import AuthContext from '../../auth-context';
import { useCreateCart } from '../cart/useCreateCart';
import { useUpdateCart } from '../cart/useUpdateCart';
import { openCartModal } from '../cart/cartModalSlice';
import { useCreateWishlist } from '../user/wishlist/useCreateWishlist';
import { addWishlist, removeWishlist } from '../user/wishlist/wishlistSlice';
import { useDeleteWishlist } from '../user/wishlist/useDeleteWishlist';
import Button from '../../ui/Button';
import ModalContainer from '../../ui/ModalContainer';
import ProductDetailModal from './ProductDetailModal';

function ProductComplete({ product }) {
  const authCtx = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const cartItems = useSelector((state) => state.cart.products);
  const wishlists = useSelector((state) => state.wishlist.items);
  // This state is used to know whether the wishlist data is still fetching from the database, so we can prevent the user from interacting with the wishlist
  const wishlistDataIsLoading = useSelector((state) => state.wishlist.fetching);
  const dispatch = useDispatch();

  const { createCart, isCreating } = useCreateCart();
  const { updateCart, isUpdating } = useUpdateCart();
  const { createWishlist, isCreating: iscreatingWishlist } =
    useCreateWishlist();
  const { deleteWishlist, isDeleting } = useDeleteWishlist();

  const isLoading = isAdding || isCreating || isUpdating;

  const {
    discountedValue,
    coverImageUrl,
    name,
    price,
    originalPrice,
    quantity,
    size,
    slug,
  } = product;

  const soldOut = quantity === 0;

  // _id: because of the product data gotten from useSearchProduct, id is not available
  const id = product.id || product._id;
  const existingItem = cartItems.find((item) => item.product._id === id);

  // if the item already exist in wishlist
  const existingInWishlist = wishlists.find((item) => item.product.id === id);

  function addToWishlistHandler() {
    if (wishlistDataIsLoading) {
      // Prevent the user from interacting with the wishlist while fetching the wishlist data
      return;
    }

    if (!authCtx.isLoggedIn) {
      toast.remove();
      toast.error('You need to be logged in to save an item');
      return;
    }

    if (!existingInWishlist) {
      createWishlist(
        { name, product: id },
        {
          onSuccess: (item) => {
            dispatch(
              addWishlist({
                id: item.data.id,
                name,
                user: item.data.user,
                product: {
                  id,
                  name,
                  originalPrice,
                  price,
                  coverImageUrl,
                  discountedValue,
                },
                slug,
              }),
            );
            toast.remove();
            toast.success('Product added your wishlist.');
          },
        },
      );
    } else {
      deleteWishlist(existingInWishlist.id, {
        onSuccess: () => {
          dispatch(removeWishlist(existingInWishlist.id));
          toast.remove();
          toast.success('Product removed from your wishlist.');
        },
      });
    }
  }

  function addToCartAuthHandler() {
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + 1;

      // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
      if (totalNewCartQuantity > quantity) {
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
                productId: id,
                name,
                coverImageUrl,
                originalPrice: originalPrice || null,
                price,
                quantity: 1,
                productQuantity: quantity,
                size,
                slug,
              }),
            );
            dispatch(openCartModal());
          },
        },
      );
    } else {
      createCart(
        { product: id, price },
        {
          onSuccess: (cart) => {
            dispatch(
              addItem({
                cartId: cart.data.id || existingItem._id,
                userId: cart.data.user,
                productId: id,
                name,
                coverImageUrl,
                originalPrice: originalPrice || null,
                price,
                quantity: 1,
                productQuantity: quantity,
                size,
                slug,
              }),
            );
            dispatch(openCartModal());
          },
        },
      );
    }
  }

  async function addToCartNoAuthHandler() {
    // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + 1;

      if (totalNewCartQuantity > quantity) {
        toast.error('You have reached the maximum quantity for this product', {
          style: {
            background: '#FCE2E2',
            color: '#F05D5D',
            maxWidth: '330px',
          },
        });
        return;
      }
    }

    if (!navigator.onLine) {
      setIsAdding(true);
      await sleep(2000);
      setIsAdding(false);

      toast.remove();
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
        originalPrice: originalPrice || null,
        price,
        quantity: 1,
        productQuantity: quantity,
        size,
        slug,
      }),
    );
    setIsAdding(false);
    dispatch(openCartModal());
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
    <div className="group/product product-item-complete relative grid grid-rows-[250px_1fr] gap-3 border border-[#e1e3e4] px-4 py-5 text-[#1F1F1F]">
      {originalPrice && (
        <span className="absolute top-[10px] z-10 rounded-e-[3px] bg-primary px-3 py-[2px] text-[12px] font-semibold text-white">
          Save {discountedValue}%
        </span>
      )}

      <button
        className={`invisible absolute right-2 top-2 z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full ${existingInWishlist ? 'bg-[#ffc900]' : 'bg-slate-400/55'} opacity-0 transition-all duration-700 hover:bg-[#ffc900] disabled:cursor-not-allowed group-hover/product:visible group-hover/product:opacity-100`}
        onClick={addToWishlistHandler}
        disabled={iscreatingWishlist || isDeleting}
      >
        {iscreatingWishlist || isDeleting ? (
          <SpinnerButton size="extra-small" />
        ) : (
          <FaHeart className="h-[14px] w-[14px] text-white" />
        )}
      </button>

      <Link to={`/product/${slug}`} className="block">
        <img
          src={coverImageUrl}
          className="block h-full w-full object-contain transition-all duration-700 group-hover/product:scale-105"
          alt={name}
        />
      </Link>

      <div className="grid gap-3">
        <div className="mb-1 space-y-2 px-1">
          <Link
            to={`/product/${slug}`}
            className="mb-1 block text-[13px] font-bold uppercase text-body transition-all duration-300 hover:text-primary"
          >
            {name}
          </Link>

          <span className="inline-block text-lg font-semibold text-primary">
            {formatCurrency(price, 2)}
          </span>

          {originalPrice && (
            <span className="relative ml-3 inline-block text-sm">
              {formatCurrency(originalPrice, 2)}
              <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#000000B3] font-medium"></span>
            </span>
          )}
        </div>

        <button
          className={`group/button relative flex flex-col items-center self-end justify-self-stretch overflow-hidden rounded-[2px] ${!soldOut ? 'bg-primary' : 'bg-[#8a9297]'} py-[9px] text-sm font-semibold text-white transition-all duration-200 ${!soldOut ? 'hover:bg-[#101010]' : 'hover:bg-[#8a9297]'} disabled:cursor-not-allowed`}
          onClick={addToCartHandler}
          disabled={isLoading || soldOut}
        >
          {!isLoading && !soldOut && (
            <PiShoppingCart className="absolute h-6 w-6 -translate-y-[150%] text-center text-white transition-all duration-200 group-hover/button:-translate-y-[2px]" />
          )}
          {!isLoading && !soldOut && (
            <span className="inline-block transition-all duration-200 group-hover/button:translate-y-[150%]">
              Add to cart
            </span>
          )}
          {isLoading && <SpinnerButton />}
          {soldOut && (
            <span className="bg-[225, 227, 228] text-white">Sold out</span>
          )}
        </button>

        <ModalContainer>
          <ModalContainer.Open opens="quick-view">
            <Button variation="transparent">Quick view</Button>
          </ModalContainer.Open>
          <ModalContainer.Window name="quick-view">
            <ProductDetailModal id={id} />
          </ModalContainer.Window>
        </ModalContainer>
      </div>
    </div>
  );
}

export default ProductComplete;
