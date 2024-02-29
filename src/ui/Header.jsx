import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';

function Header() {
  return (
    <header>
      <div className="container mx-auto flex h-[80px] items-center justify-between px-10">
        <Link to="/">
          <img src="/logo.png" className="w-40" alt="playsphere-logo" />
        </Link>

        <form className="basis-[50%]">
          <div className="flex items-center rounded-3xl border border-[#a3a3a6]">
            <input
              type="search"
              className="grow rounded-3xl border-solid px-5 py-[10px] font-sans text-sm shadow-sm placeholder:font-sans placeholder:text-[15px] placeholder:text-stone-500 focus:outline-none"
              placeholder="Search for products..."
            />
            <button className="grid items-center self-stretch rounded-3xl bg-secondary px-3">
              <FiSearch className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-7">
          <button className="flex gap-2 text-[15px] font-medium text-[#313133] hover:text-secondary">
            <FaRegUser className="h-5 w-5" />
            Login / Signup
          </button>

          <button className="relative">
            <MdOutlineShoppingCart className="h-7 w-7 text-[#313133]" />
            <span className="absolute -right-2 -top-1 flex h-4 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-white">
              10
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
