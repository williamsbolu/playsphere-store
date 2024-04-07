import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { addItem, updateChange } from '../cart/cartSlice';
import SpinnerButton from '../../ui/SpinnerButton';
import Button from '../../ui/Button';
import AuthContext from '../../auth-context';
import { useCreateCart } from '../cart/useCreateCart';
import { useUpdateCart } from '../cart/useUpdateCart';

function ProductDetail({ product }) {
  const authCtx = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState();
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const { createCart, isCreating } = useCreateCart();
  const { updateCart, isUpdating } = useUpdateCart();

  const isLoading = isAdding || isCreating || isUpdating;

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
    slug,
  } = product;

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
                quantity,
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
                quantity,
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
        quantity,
        slug,
      }),
    );
    setIsAdding(false);
    setQuantity(1);
    dispatch(updateChange());
  }

  const addToCartHandler = () => {
    if (!authCtx.isLoggedIn) {
      addToCartNoAuthHandler();
    } else {
      addToCartAuthHandler();
    }
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  return (
    <section className="app-container pb-20">
      <div className="my-10 flex items-center justify-between text-[13px] text-[#1F1F1F]">
        <ul className="flex items-center space-x-1">
          <li className="flex items-center font-normal">
            <Link
              to="/"
              className="transition-all duration-200 hover:text-primary"
            >
              Home
            </Link>
            <MdKeyboardArrowRight className="h-4 w-4" />
          </li>
          <li className="flex items-center font-normal">
            <Link
              to={`/product-category/${platform}/`}
              className="transition-all duration-200 hover:text-primary"
            >
              {platformsComplete[platform]}
            </Link>
            <MdKeyboardArrowRight className="h-4 w-4" />
          </li>
          <li className="flex items-center font-normal">
            <Link
              to="/"
              className="transition-all duration-200 hover:text-primary"
            >
              {categoryText}
            </Link>
            {genre && <MdKeyboardArrowRight className="h-4 w-4" />}
          </li>
          {genre && (
            <li className="flex items-center font-normal">
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
          <li className="group flex items-center font-normal">
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

          <li className="group flex items-center font-normal">
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
        <div className="rounded-md border border-solid border-[#e7e2de] p-5">
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

        <div className="rounded-md border border-solid border-[#e7e2de] p-7 text-[#1F1F1F]">
          <div className="space-y-4 border-b border-solid border-[#e7e2de]">
            <h2 className="font-heading text-[28px] font-medium leading-10">
              {name}
            </h2>

            {originalPrice && (
              <span className="inline-block rounded-3xl bg-primary px-3 py-1 text-xs font-medium text-white">
                Save {discountedValue}%
              </span>
            )}

            <div className="pb-6 text-sm font-medium">
              Brand:{' '}
              <Link to="" className="ml-1 text-[15px] font-normal text-primary">
                {brand}
              </Link>
            </div>
          </div>
          <div className="space-y-6 bg-fixed py-5">
            <h4 className="flex items-center text-[15px] font-medium">
              Price:{' '}
              <span className="ml-5 text-[23px] font-medium text-primary">
                {formatCurrency(price)}
              </span>
              {originalPrice && (
                <span className="relative ml-5 inline-block text-[15px] font-normal">
                  {formatCurrency(originalPrice)}
                  <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#1F1F1F]"></span>
                </span>
              )}
            </h4>

            <div className="flex items-center">
              <h4 className="mr-5 h-full text-[15px] font-medium">Quantity:</h4>
              <div className="flex h-10 w-24 items-center rounded-3xl border border-solid border-[#e7e2de]">
                <button
                  className="h-full w-1/3 rounded-s-3xl border-r border-solid border-[#e7e2de] text-xl text-[#777] hover:bg-primary hover:text-white"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm text-[#777]">
                  {quantity}
                </span>
                <button
                  className="h-full w-1/3 rounded-e-3xl border-l border-solid border-[#e7e2de] text-lg text-[#777] hover:bg-primary hover:text-white"
                  onClick={() => setQuantity((prevQty) => prevQty + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 space-x-4 text-white">
              <Button onClick={addToCartHandler} disabled={isLoading}>
                {isLoading ? <SpinnerButton type="white" /> : 'Add to cart'}
              </Button>

              <Button type="secondary">Buy now</Button>
            </div>
          </div>
          <button className="flex h-10 items-center gap-2 text-[15px] text-[#13133] hover:opacity-80">
            <FaRegHeart className="h-4 w-4" />
            Save for later
          </button>
        </div>

        <div className="space-y-7 rounded-md border border-solid border-[#e7e2de] p-7 leading-7 text-[#1F1F1F]">
          <h2 className="font- font-heading text-2xl font-medium">
            Description
          </h2>

          <ul className="ml-5 space-y-4 text-[15px] font-normal">
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
