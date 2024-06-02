import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FancyBox from '../../utils/FancyBox';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaRegHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import {
  formatCurrency,
  getProductCategoriesText,
  sleep,
} from '../../utils/helpers';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { addItem } from '../cart/cartSlice';
import SpinnerButton from '../../ui/SpinnerButton';
import Button from '../../ui/Button';
import AuthContext from '../../auth-context';
import { useCreateCart } from '../cart/useCreateCart';
import { useUpdateCart } from '../cart/useUpdateCart';
import { openCartModal } from '../cart/cartModalSlice';

function ProductDetail({ product }) {
  const authCtx = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState();
  const [isCheckingOut, setIsCheckingOut] = useState();
  const [cartQuantity, setcartQuantity] = useState(1);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const cartItems = useSelector((state) => state.cart.products);
  const existingItem = cartItems.find(
    (item) => item.product._id === product.id,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createCart, isCreating } = useCreateCart();
  const { updateCart, isUpdating } = useUpdateCart();

  const isLoading =
    isAdding ||
    (isCreating && !isCheckingOut) ||
    (isUpdating && !isCheckingOut);

  const {
    id,
    name,
    category,
    platform,
    brand,
    originalPrice,
    price,
    coverImageUrl,
    imagesUrl,
    discountedValue,
    genre,
    prevProductSlug,
    nextProductSlug,
    quantity,
    size,
    slug,
  } = product;

  const soldOut = quantity === 0;

  const platformsComplete = {
    ps4: 'Playstation 4',
    ps5: 'Playstation 5',
    'xbox-one': 'Xbox One',
    'xbox-series-x': 'Xbox Series X',
    'xbox-series-s': 'Xbox Series S',
    'nintendo-switch': 'Nintendo Switch',
    'steam-deck': 'Steam Deck',
  };

  const categoryText = getProductCategoriesText(
    category,
    platform,
    platformsComplete,
  );

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
      const totalNewCartQuantity = existingItem.quantity + cartQuantity;

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
                name,
                coverImageUrl,
                originalPrice: originalPrice || null,
                price,
                quantity: cartQuantity,
                productQuantity: quantity,
                size,
                slug,
              }),
            );
            if (type === 'isCheckingOut') {
              setIsCheckingOut(false);
              navigate('/checkout');
            } else {
              dispatch(openCartModal());
            }
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
                quantity: cartQuantity,
                productQuantity: quantity,
                size,
                slug,
              }),
            );
            if (type === 'isCheckingOut') {
              setIsCheckingOut(false);
              navigate('/checkout');
            } else {
              dispatch(openCartModal());
            }
          },
        },
      );
    }
  }

  async function addToCartNoAuthHandler() {
    // if the items exist and the quantity the user is adding is larger than the units available (existingItem.quantity meaning the cart quantity)
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + cartQuantity;

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
        quantity: cartQuantity,
        productQuantity: quantity,
        size,
        slug,
      }),
    );
    setIsAdding(false);
    dispatch(openCartModal());
    setcartQuantity(1);
  }

  const addToCartHandler = () => {
    if (!authCtx.isLoggedIn) {
      addToCartNoAuthHandler();
    } else {
      addToCartAuthHandler();
    }
  };

  const increaseQuantity = () => {
    if (cartQuantity >= quantity) {
      setErrorQuantity(true);
      return;
    }

    setcartQuantity((prevQty) => prevQty + 1);
  };
  const decreaseQuantity = () => {
    if (cartQuantity === 1) return;
    setcartQuantity((prevQty) => prevQty - 1);
  };

  const buyNowHandler = async () => {
    if (existingItem) {
      const totalNewCartQuantity = existingItem.quantity + cartQuantity;

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
          name,
          coverImageUrl,
          originalPrice: originalPrice || null,
          price,
          quantity: cartQuantity,
          productQuantity: quantity,
          size,
          slug,
        }),
      );
      setcartQuantity(1);
      navigate('/checkout');
    } else {
      addToCartAuthHandler('isCheckingOut');
    }
  };

  return (
    <section className="app-container pb-20">
      <div className="flex items-center justify-between py-10 text-sm font-semibold text-black">
        <ul className="flex items-center space-x-1">
          <li className="flex items-center">
            <Link
              to="/"
              className="transition-all duration-200 hover:text-primary"
            >
              Home
            </Link>
            <MdKeyboardArrowRight className="h-4 w-4" />
          </li>
          <li className="flex items-center">
            <Link
              to={`/product-category/${platform}/`}
              className="transition-all duration-200 hover:text-primary"
            >
              {platformsComplete[platform]}
            </Link>
            <MdKeyboardArrowRight className="h-4 w-4" />
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className="text-[15px] transition-all duration-200 hover:text-primary"
            >
              {categoryText}
            </Link>
            {genre && <MdKeyboardArrowRight className="h-4 w-4" />}
          </li>
          {genre && (
            <li className="flex items-center">
              <Link
                to="/"
                className="transition-all duration-200 hover:text-primary"
              >
                Home
              </Link>
            </li>
          )}
        </ul>

        <ul className="flex items-center space-x-4">
          <li className="group flex items-center">
            <MdKeyboardArrowLeft className="h-4 w-4 group-hover:text-primary" />
            <Link
              to={
                prevProductSlug
                  ? `/product/${prevProductSlug}`
                  : `/product/${slug}`
              }
              className="transition-all duration-200 group-hover:text-primary"
            >
              Prev
            </Link>
          </li>

          <span className="inline-block">|</span>

          <li className="group flex items-center">
            <Link
              to={
                nextProductSlug
                  ? `/product/${nextProductSlug}`
                  : `/product/${slug}`
              }
              className="transition-all duration-200 group-hover:text-primary"
            >
              Next
            </Link>
            <MdKeyboardArrowRight className="h-4 w-4 group-hover:text-primary" />
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white p-5">
          <FancyBox
            options={{
              Carousel: {
                infinite: false,
              },
            }}
          >
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
              {imagesUrl.map((image) => (
                <Link
                  key={image}
                  data-fancybox="gallery"
                  to={image}
                  className="block"
                >
                  <img
                    src={image}
                    className="max-h-[400px] w-auto object-contain"
                    alt={name}
                  />
                </Link>
              ))}
            </Carousel>
          </FancyBox>
        </div>

        <div className="rounded-[3px] border border-solid border-[#e1e3e4] bg-white p-7 text-black">
          <div className="space-y-6 border-b border-solid border-[#e1e3e4]">
            <h2 className="font-heading text-[28px] font-medium leading-10 text-body">
              {name}
            </h2>

            {originalPrice && (
              <span className="inline-block rounded-[3px] bg-primary px-3 py-1 text-xs font-semibold text-white">
                Save {discountedValue}%
              </span>
            )}

            <Link
              to=""
              className="ml-1 block pb-4 text-sm font-semibold uppercase text-primary"
            >
              {brand}
            </Link>
          </div>
          <div className="space-y-6 bg-fixed py-5">
            <h4 className="flex items-center text-[15px] font-bold text-body">
              Price:{' '}
              <span className="ml-5 text-[22px] font-semibold text-primary">
                {formatCurrency(price, 2)}
              </span>
              {originalPrice && (
                <span className="relative ml-5 inline-block text-[15px] font-semibold text-black">
                  {formatCurrency(originalPrice, 2)}
                  <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-black"></span>
                </span>
              )}
            </h4>

            <div className="flex items-center">
              <h4 className="mr-5 h-full text-[15px] font-bold text-body">
                Quantity:
              </h4>
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-28 items-center rounded-[3px] border border-solid border-[#e1e3e4]">
                  <button
                    className="h-full w-1/3 rounded-s-[3px] border-r border-solid border-[#e1e3e4] text-xl text-[#777] hover:bg-primary hover:text-white"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm text-[#777]">
                    {!soldOut ? cartQuantity : quantity}
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
                {isLoading && <SpinnerButton />}
                {!isLoading && !soldOut && 'Add to cart'}
                {soldOut && 'Sold out'}
              </Button>

              {!soldOut && (
                <Button variation="secondary" onClick={buyNowHandler}>
                  Buy now
                </Button>
              )}
            </div>
          </div>
          <button className="flex h-10 items-center gap-2 text-[15px] text-[#13133] hover:opacity-80">
            <FaRegHeart className="h-5 w-5" />
            Save for later
          </button>
        </div>

        <div className="space-y-7 rounded-[3px] border border-solid border-[#e1e3e4] bg-white p-7 leading-7 text-black">
          <h2 className="font-heading text-2xl font-medium text-body">
            Description
          </h2>

          <ul className="ml-5 space-y-4 text-base font-normal">
            <li className="relative before:absolute before:-left-4 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[rgba(0,0,0,0.6)] before:content-['']">
              <span>
                Precision Control offering players absolute control over all of
                their games.
              </span>
            </li>
            <li className="relative before:absolute before:-left-4 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[rgba(0,0,0,0.6)] before:content-['']">
              <span>
                Sharing at Your Fingertips: The SHARE button allows you to
                upload gameplay videos and screenshots or live-stream your
                gameplay while the game is in progress.
              </span>
            </li>
            <li className="relative before:absolute before:-left-4 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[rgba(0,0,0,0.6)] before:content-['']">
              <span>
                New Ways to Play: Features like the touch pad, integrated light
                bar, and built-in speaker offer new ways to experience and
                interact with your games.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

// incase of future errors in the product slider.. the previous solutions was this below
// className="h-[400px] w-[400px] object-contain"
