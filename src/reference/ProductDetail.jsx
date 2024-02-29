import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import FancyBox from '../utils/FancyBox';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

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
        background: '#08C076',
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
        background: '#08C076',
      }}
      onClick={onClick}
    />
  );
}

function ProductDetail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 9000,
    pauseOnHover: true,
    pauseOnFocus: true,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <ul style={{ transform: 'translateY(-150%)' }}>{dots}</ul>
    ),
  };

  return (
    <>
      <section className="container mx-auto px-10 py-20">
        <div className="grid auto-rows-[350px] grid-cols-2 gap-8">
          <div className="rounded-md border border-solid border-[#e7e2de] p-5">
            <div className="relative">
              <FancyBox
                options={{
                  Carousel: {
                    infinite: false,
                  },
                }}
              >
                <Slider {...settings}>
                  <div className="h-[300px]">
                    <Link
                      data-fancybox="gallery"
                      to="/xbox-7986823_640.jpg"
                      className="focus:outline-none"
                    >
                      <img
                        src="/playstation-6921618_640.jpg"
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="h-[300px]">
                    <Link
                      data-fancybox="gallery"
                      to="/xbox-7986823_640.jpg"
                      className="focus:outline-none"
                    >
                      <img
                        src="/xbox-7986823_640.jpg"
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="h-[300px]">
                    <Link
                      data-fancybox="gallery"
                      to="/video-game-console-2202663_640.jpg"
                      className="focus:outline-none"
                    >
                      <img
                        src="/video-game-console-2202663_640.jpg"
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="h-[300px]">
                    <Link
                      data-fancybox="gallery"
                      to="/ps4-4560985_640.jpg"
                      className="focus:outline-none"
                    >
                      <img
                        src="/ps4-4560985_640.jpg"
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </Link>
                  </div>
                </Slider>
              </FancyBox>
            </div>
          </div>
          <div className="rounded-md border border-solid border-[#e7e2de]"></div>
          <div className="rounded-md border border-solid border-[#e7e2de]"></div>
          <div className="rounded-md border border-solid border-[#e7e2de]"></div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
// e7e2de
