import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: '20px',
      }}
      onClick={onClick}
    />
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: '20px',
        zIndex: 9,
      }}
      onClick={onClick}
    />
  );
}

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    pauseOnFocus: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <ul style={{ transform: 'translateY(-150%)' }}>{dots}</ul>
    ),
  };

  return (
    <section className="relative">
      <Slider {...settings} className="">
        <div className="h-[400px]">
          <Link to="/" className="focus:outline-none">
            <img src="/xbox-series.png" className="w-full" alt="xbox-series" />
          </Link>
        </div>
        <div className="h-[400px]">
          <Link to="/" className="focus:outline-none">
            <img src="/Fc-24.png" className="w-full" alt="fc-24" />
          </Link>
        </div>
        <div className="h-[400px]">
          <Link to="/" className="focus:outline-none">
            <img
              src="/ps5-slim-banner.png"
              className="w-full"
              alt="playstation"
            />
          </Link>
        </div>
        <div className="h-[400px]">
          <Link to="/" className="focus:outline-none">
            <img src="/switch-2.png" className="w-full" alt="nintendo" />
          </Link>
        </div>
        <div className="h-[400px]">
          <Link to="/" className="focus:outline-none">
            <img
              src="/SLIDE-GIFT-CARD-2.png"
              className="w-full"
              alt="gift cards"
            />
          </Link>
        </div>
      </Slider>
    </section>
  );
}

export default Hero;
