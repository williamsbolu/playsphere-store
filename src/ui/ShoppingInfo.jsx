import Slider from 'react-slick';
import { BsBox } from 'react-icons/bs';
import { BsCartCheck } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md';

function ShoppingInfo() {
  const settings = {
    dots: false,
    draggable: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    initialSlide: 0,
    responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //     },
      //   },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#F3F5F6]">
      <Slider {...settings} className="app-container py-10">
        <div>
          <div className="grid grid-cols-[min-content_1fr] gap-5 pr-10">
            <BsBox className="mt-1 h-7 w-7 text-primary" />
            <div className="space-y-2">
              <p className="text-body text-base font-semibold">Free shipping</p>
              <p className="text-base leading-7 text-black">
                Enjoy free shipping in Lagos, Abuja, Port Harcourt and Kano for
                orders exceeding 100,000NGN, or opt for nationwide delivery
                through Fedex across Nigeria.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[min-content_1fr] gap-5 pr-10">
            <BsCartCheck className="mt-1 h-7 w-7 text-primary" />
            <div className="space-y-2">
              <p className="text-body text-base font-semibold">
                Satisfied or refunded
              </p>
              <p className="text-base leading-7 text-black">
                We recognize that preferences may change: you have 7 days to
                request a return and refund. Terms & Conditions apply.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[min-content_1fr] gap-5 pr-10">
            <BiSupport className="mt-1 h-7 w-7 text-primary" />
            <div className="space-y-2">
              <p className="text-body text-base font-semibold">
                Top-notch support
              </p>
              <p className="text-base leading-7 text-black">
                We ensure 100% responsiveness and transparency in our
                interactions with everyone.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[min-content_1fr] gap-5">
            <MdOutlinePayment className="mt-1 h-7 w-7 text-primary" />
            <div className="space-y-2">
              <p className="text-body text-base font-semibold">
                Pay On Delivery, Pay on Pick-up or Pay Online
              </p>
              <p className="text-base leading-7 text-black">
                We offer you flexibility and convenience: choose your preferred
                payment method.
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
}

export default ShoppingInfo;
