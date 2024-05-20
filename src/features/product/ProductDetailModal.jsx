import { useContext, useEffect, useState } from 'react';
import { useProductById } from './useProductById';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCart } from '../cart/useCreateCart';
import { useUpdateCart } from '../cart/useUpdateCart';
import AuthContext from '../../auth-context';
import { addItem } from '../cart/cartSlice';
import { formatCurrency, sleep } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import SpinnerButton from '../../ui/SpinnerButton';
import Spinner from '../../ui/Spinner';
import ErrorPage from '../../ui/ErrorPage';

function ProductDetailModal({ id }) {
  const { isLoadingProduct, product, error, refetch } = useProductById(id);
  const authCtx = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState();
  const [quantity, setQuantity] = useState(1);
  const [errorQuantity, setErrorQuantity] = useState(false);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartItems = useSelector((state) => state.cart.products);
  const existingItem = cartItems.find((item) => item.product._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createCart, isCreating } = useCreateCart();
  const { updateCart, isUpdating } = useUpdateCart();

  const isLoading =
    isAdding ||
    (isCreating && !isCheckingOut) ||
    (isUpdating && !isCheckingOut);

  const soldOut = product?.quantity === 0;

  useEffect(() => {
    if (!errorQuantity) return;
    const errorTimeout = setTimeout(() => setErrorQuantity(false), 2000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errorQuantity]);

  async function addToCartAuthHandler(type = 'cart') {
    // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + quantity;

      if (totalNewCartQuantity > product.quantity) {
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

    if (type === 'isCheckingOut') setIsCheckingOut(true);

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
                name: product.name,
                coverImageUrl: product.coverImageUrl,
                originalPrice: product.originalPrice || null,
                price: product.price,
                quantity,
                productQuantity: product.quantity,
                slug: product.slug,
              }),
            );
            if (type === 'isCheckingOut') {
              setIsCheckingOut(false);
              navigate('/checkout');
            }
          },
        },
      );
    } else {
      createCart(
        { product: id, price: product.price },
        {
          onSuccess: (cart) => {
            dispatch(
              addItem({
                cartId: cart.data.id || existingItem._id,
                userId: cart.data.user,
                productId: id,
                name: product.name,
                coverImageUrl: product.coverImageUrl,
                originalPrice: product.originalPrice || null,
                price: product.price,
                quantity,
                productQuantity: product.quantity,
                slug: product.slug,
              }),
            );
            if (type === 'isCheckingOut') {
              setIsCheckingOut(false);
              navigate('/checkout');
            }
          },
        },
      );
    }
  }

  async function addToCartNoAuthHandler() {
    // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + quantity;

      if (totalNewCartQuantity > product.quantity) {
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
        name: product.name,
        coverImageUrl: product.coverImageUrl,
        originalPrice: product.originalPrice || null,
        price: product.price,
        quantity,
        productQuantity: product.quantity,
        slug: product.slug,
      }),
    );
    setIsAdding(false);
    setQuantity(1);
  }

  const addToCartHandler = () => {
    if (!authCtx.isLoggedIn) {
      addToCartNoAuthHandler();
    } else {
      addToCartAuthHandler();
    }
  };

  const increaseQuantity = () => {
    if (quantity >= product.quantity) {
      setErrorQuantity(true);
      return;
    }

    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  const buyNowHandler = async () => {
    // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + quantity;

      if (totalNewCartQuantity > product.quantity) {
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
          productId: id,
          name: product.name,
          coverImageUrl: product.coverImageUrl,
          originalPrice: product.originalPrice || null,
          price: product.price,
          quantity,
          productQuantity: product.quantity,
          slug: product.slug,
        }),
      );
      setQuantity(1);
      navigate('/checkout');
    } else {
      addToCartAuthHandler('isCheckingOut');
    }
  };

  return (
    <div className="w-[1100px]">
      {!isLoadingProduct && !error && (
        <div className="grid grid-cols-2">
          <div className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white p-5">
            <Carousel
              autoPlay={true}
              emulateTouch={true}
              className="h-300px block"
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight={true}
              interval={9000}
              swipeable={true}
            >
              {product.imagesUrl.map((image) => (
                <div key={image}>
                  <img
                    src={image}
                    className="max-h-[400px] w-auto object-contain"
                    alt={product.name}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white p-7 text-black">
            <div className="space-y-6 border-b border-solid border-[#e1e3e4]">
              <h2 className="font-heading text-2xl font-medium leading-10 text-body">
                {product.name}
              </h2>

              {product.originalPrice && (
                <span className="inline-block rounded-[3px] bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Save {product.discountedValue}%
                </span>
              )}

              <Link
                to=""
                className="ml-1 block pb-4 text-[13px] font-semibold uppercase text-primary"
              >
                {product.brand}
              </Link>
            </div>
            <div className="space-y-6 py-5">
              <h4 className="flex items-center text-[15px] font-semibold text-body">
                Price:{' '}
                <span className="ml-5 text-xl font-semibold text-primary">
                  {formatCurrency(product.price, 2)}
                </span>
                {product.originalPrice && (
                  <span className="relative ml-5 inline-block text-[15px] font-semibold">
                    {formatCurrency(product.originalPrice, 2)}
                    <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-black"></span>
                  </span>
                )}
              </h4>

              <div className="flex items-center">
                <h4 className="mr-5 h-full text-[15px] font-semibold text-body">
                  Quantity:
                </h4>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-24 items-center rounded-[3px] border border-solid border-[#e1e3e4]">
                    <button
                      className="h-full w-1/3 rounded-s-[3px] border-r border-solid border-[#e1e3e4] text-xl text-[#777] hover:bg-primary hover:text-white"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm text-[#777]">
                      {quantity}
                    </span>
                    <button
                      className="h-full w-1/3 rounded-e-[3px] border-l border-solid border-[#e1e3e4] text-lg text-[#777] hover:bg-primary hover:text-white"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  {errorQuantity && (
                    <p className="text-[13px] text-[#D0021B]">
                      {product.quantity === 0
                        ? 'Out of stock'
                        : `Only ${product.quantity} items left`}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 space-x-4 text-white">
                <Button
                  onClick={addToCartHandler}
                  disabled={isLoading || soldOut}
                  additionalClass="h-10"
                  variation={!soldOut ? 'primary' : 'soldout'}
                >
                  {isLoading ? <SpinnerButton /> : 'Add to cart'}
                </Button>

                {!soldOut && (
                  <Button variation="secondary" onClick={buyNowHandler}>
                    Buy now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoadingProduct && <Spinner />}
      {error && !isLoadingProduct && <ErrorPage refetch={refetch} />}
    </div>
  );
}

export default ProductDetailModal;
