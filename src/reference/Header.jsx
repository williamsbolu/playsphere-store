import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';

import { BsCart } from 'react-icons/bs';
import Modal from './Modal';
import CartModal from '../features/cart/CartModal';
import AuthFormModal from '../features/authentication/AuthFormModal';

function Header() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header>
      <div className="app-container flex h-[80px] items-center justify-between">
        <Link to="/">
          <img src="/logo.png" className="w-40" alt="playsphere-logo" />
        </Link>

        <form className="basis-[60%]">
          <div className="flex items-center rounded-3xl border border-[#a3a3a6]">
            <input
              type="search"
              className="grow rounded-3xl border-solid px-5 py-[10px] font-sans text-sm shadow-sm placeholder:font-sans placeholder:text-[15px] placeholder:text-stone-500 focus:outline-none"
              placeholder="Search for products..."
            />
            <button className="grid items-center self-stretch rounded-e-3xl bg-primary px-3">
              <FiSearch className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <Modal>
            <Modal.Open opens="login-form">
              <button className="mr-8 flex items-center gap-[5px] text-base font-medium text-[#1F1F1F]">
                <RiUserLine className="h-[24px] w-[24px]" />
                Login
              </button>
            </Modal.Open>

            <Modal.Window type="right" name="login-form">
              <AuthFormModal />
            </Modal.Window>

            <Modal.Open opens="cart">
              <button className="relative">
                <BsCart className="h-7 w-7 text-[#1F1F1F]" />
                <span className="absolute -right-[9px] -top-[5px] justify-center rounded-full bg-primary px-[3px] py-[2px] text-[10px] font-semibold text-white">
                  {cartQuantity}
                </span>
              </button>
            </Modal.Open>

            <Modal.Window type="right" name="cart">
              <CartModal />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </header>
  );
}

export default Header;

// when the compound component pattern was used for the header approach
