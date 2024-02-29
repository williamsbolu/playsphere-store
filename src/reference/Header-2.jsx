import { Link } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';
import { LuShoppingCart } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';

function Header() {
  return (
    <header className="bg-primary">
      <div className="container mx-auto flex h-[80px] items-center justify-between px-10">
        <Link to="/">
          <img
            src="/logo-no-background.png"
            className="w-40"
            alt="playsphere-logo"
          />
        </Link>

        <form className="flex basis-[40%] items-center justify-center">
          <input
            type="search"
            className="w-[90%] rounded-3xl bg-white px-6 py-2 font-sans text-sm shadow-sm transition-all duration-300 placeholder:font-sans placeholder:text-sm placeholder:text-stone-500 focus:w-full focus:outline-none"
            placeholder="Search for products..."
          />
          <span className="-ml-10 grid items-center self-stretch rounded-3xl bg-white px-2">
            <FiSearch className="h-5 w-5 text-stone-600/90" />
          </span>
        </form>

        <div className="flex items-center gap-5">
          <button className="rounded-full bg-white p-2">
            <FaRegHeart className="h-4 w-4 text-[#313133]" />
          </button>

          <button className="flex gap-2 rounded-3xl bg-white px-6 py-2 text-sm">
            <FiUser className="h-5 w-5 text-[#313133]" />
            Login / Signup
          </button>

          <button className="flex gap-2 rounded-3xl bg-[#101010] px-4 py-2">
            <LuShoppingCart className="h-5 w-5 text-white" />
            <span className="text-sm text-white">₦1,280,000.00</span>
          </button>

          {/* <button className="relative">
            <IoCartOutline className="text-secondary h-8 w-8" />
            <span className="absolute -right-3 -top-1 flex text-xs text-white">
              10
            </span>
          </button> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
// font-family: "Roboto", sans-serif;

/* <button className="flex gap-2 rounded-3xl bg-white px-6 py-2 text-sm">
  <FiUser className="h-5 w-5 text-[#313133]" />
  Login / Signup
</button>; */

// Cart button
/* <button className="relative">
            <IoCartOutline className="h-8 w-8 text-white" />
            <span className="absolute -right-1 -top-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#08C076] text-[10px] text-white">
              10
            </span>
          </button> */
