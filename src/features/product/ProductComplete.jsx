import { Link } from 'react-router-dom';
import { PiShoppingCart } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa6';

function ProductComplete() {
  return (
    <div className="relative grid grid-rows-[250px_1fr] gap-5 border border-[#e7e2de] p-5">
      <button className="absolute right-2 top-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-slate-400/55 hover:bg-secondary">
        <FaHeart className="h-[14px] w-[14px] text-white" />
      </button>

      <Link to="/" className="block">
        <img
          src="/video-game-console-2202663_640.jpg"
          className="block h-full w-full object-contain"
          alt=""
        />
      </Link>

      <div className="grid gap-3">
        <div className="space-y-2 px-1">
          <Link to="" className="text-[15px] text-[#313133]">
            Xbox 360 Console Black
          </Link>

          <span className="block font-medium text-secondary">₦296,999</span>
        </div>

        <button className="group relative flex flex-col items-center justify-self-stretch overflow-hidden rounded-3xl bg-secondary py-[10px] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#101010]">
          <PiShoppingCart className="absolute h-6 w-6 -translate-y-[150%] text-center text-white transition-all duration-200 group-hover:-translate-y-[2px]" />
          <span className="inline-block transition-all duration-200 group-hover:translate-y-[150%]">
            Add to cart
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductComplete;
