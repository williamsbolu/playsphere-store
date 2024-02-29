import { Link } from 'react-router-dom';
import FancyBox from '../../utils/FancyBox';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ProductDetail() {
  return (
    <>
      <section className="container mx-auto px-10 py-20">
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
                <Link
                  data-fancybox="gallery"
                  to="/video-game-console-2202663_640.jpg"
                  className="block"
                >
                  <img
                    src="/video-game-console-2202663_640.jpg"
                    className="h-[400px] w-[400px] object-contain"
                    alt=""
                  />
                </Link>
                <Link
                  data-fancybox="gallery"
                  to="/ps4-4560985_640.jpg"
                  className="block"
                >
                  <img
                    src="/ps4-4560985_640.jpg"
                    className="h-[400px] w-[400px] object-contain"
                    alt=""
                  />
                </Link>
                <Link
                  data-fancybox="gallery"
                  to="/button-4628422_640.jpg"
                  className="block"
                >
                  <img
                    src="/button-4628422_640.jpg"
                    className="h-[400px] w-[400px] object-contain"
                    alt=""
                  />
                </Link>
              </Carousel>
            </FancyBox>
          </div>

          <div className="rounded-md border border-solid border-[#e7e2de] p-7">
            <div className="space-y-4 border-b border-solid border-[#e7e2de]">
              <h2 className="text-[28px] font-normal leading-10 text-[#31333]">
                DUALSHOCK 4 Wireless Controller for PS4 – Wave Blue
              </h2>
              <span className="inline-block rounded-3xl bg-primary px-3 py-1 text-xs font-medium text-white">
                Save 16%
              </span>

              <div className="text=[#313133] pb-6 text-sm">
                Brand:{' '}
                <Link to="" className="font-medium text-primary">
                  Playstation
                </Link>
              </div>
            </div>
            <div className="space-y-6 py-5">
              <h4 className="flex items-center font-normal text-[#313133]">
                Price:{' '}
                <span className="ml-5 text-[23px] font-medium text-secondary">
                  ₦289,999
                </span>
                <span className="relative ml-5 inline-block text-[15px] text-[#75757A]">
                  ₦346,999
                  <span className="absolute left-0 top-[45%] inline-block h-[2px] w-full bg-[#75757A]"></span>
                </span>
              </h4>

              <div className="flex items-center">
                <h4 className="mr-5 h-full font-normal text-[#313133]">
                  Quantity:
                </h4>
                <div className="flex h-10 w-24 items-center rounded-3xl border border-solid border-[#e7e2de]">
                  <button className="h-full w-1/3 rounded-s-3xl border-r border-solid border-[#e7e2de] text-xl text-[#777] hover:bg-secondary hover:text-white">
                    -
                  </button>
                  <span className="flex-1 text-center text-sm text-[#777]">
                    {0}
                  </span>
                  <button className="h-full w-1/3 rounded-e-3xl border-l border-solid border-[#e7e2de] text-lg text-[#777] hover:bg-secondary hover:text-white">
                    +
                  </button>
                </div>
              </div>
              <div className="block space-x-4 text-white">
                <button className="rounded-3xl bg-secondary px-10 py-[10px] text-sm transition-all duration-200 hover:bg-[#101010]">
                  Add to cart
                </button>
                <button className="rounded-3xl bg-[#101010] px-10 py-[10px] text-sm transition-all duration-200 hover:bg-secondary">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-5 rounded-md border border-solid border-[#e7e2de] p-5 leading-6 text-[#313133]">
            <h2 className="font- text-xl font-medium">Description</h2>

            <ul className="space-y-4 text-[15px] font-normal">
              <li className=" before:">
                Precision Control offering players absolute control over all of
                their games.
              </li>
              <li>
                Sharing at Your Fingertips: The SHARE button allows you to
                upload gameplay videos and screenshots or live-stream your
                gameplay while the game is in progress.
              </li>
              <li>
                New Ways to Play: Features like the touch pad, integrated light
                bar, and built-in speaker offer new ways to experience and
                interact with your games.
              </li>
            </ul>
          </div>
          <div className="rounded-md border border-solid border-[#e7e2de]"></div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
// e7e2de
