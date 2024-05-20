import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function BrandsCarousel() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'rgba(8, 192, 118, 0.463)',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'rgba(8, 192, 118, 0.463)',
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: false,
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
    <div className="app-container space-y-7">
      <h2 className="text-body font-heading text-[22px] font-semibold">
        Our Brands
      </h2>

      <Slider {...settings} className="">
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/PlayStation-Logo-PNG13.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="playstation logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Playstation
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/ps5-logo-300x300.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="Playstation 5 logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Playstation 5
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/Xbox-Logo-PNG12.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="xbox logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Xbox
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/Nintendo-Logo-PNG8.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="nintendo logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Nintendo
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/Green-Xbox-Series-S-&-Series-X-Logos.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="xbox series logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Xbox Series
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/PlayStation-Logo-PNG10.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="Playstation 4 logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Playstation 4
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/Nintendo-Switch-Logo-PNG.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="Nintendo Switch logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Nintendo Switch
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div>
          <Link to="" className="group flex flex-col items-center">
            <div className="h-[165px] w-[165px]">
              <img
                src="/Steam_logo_PNG15.png"
                className="h-full w-full object-contain transition-all duration-1000 group-hover:scale-105"
                alt="Steam logo"
              />
            </div>
            <span className="flex h-6 items-center gap-1 text-[15px] font-medium group-hover:text-primary">
              Steam
              <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-500 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

export default BrandsCarousel;
