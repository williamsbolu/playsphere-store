import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCart4 } from 'react-icons/bs';
import { LiaUserSolid } from 'react-icons/lia';
import { VscPackage } from 'react-icons/vsc';
import { RiUserFollowLine } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { IoIosHeartEmpty } from 'react-icons/io';

import AuthContext from '../auth-context';
import Modal from '../reference/Modal';
import CartModal from '../features/cart/CartModal';
import AuthFormModal from '../features/authentication/AuthFormModal';
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '../features/authentication/useLogout';
import SearchBarResults from './SearchBarResults';
import { useOutsideClick } from '../hooks/useOutsideClick';
import SpinnerButton from './SpinnerButton';
import { useSearchProduct } from '../features/product/useSearchProduct';
import { IoMailSharp } from 'react-icons/io5';

function Header() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);
  const cartModalChanged = useSelector((state) => state.cartModal.changed);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cartBtnRef = useRef();
  const { isLoadingProduct, products, error, refetch, isQueryEnabled } =
    useSearchProduct(query);
  const isLoading = isLoadingProduct && isQueryEnabled;
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout('displayProgress');
  const ref = useOutsideClick(() => setSearchTerm(''));

  const { firstName } = user;

  useEffect(() => {
    if (searchTerm.length <= 2) return;

    // initial search
    if (searchTerm.length === 3) return setQuery(searchTerm);

    const debounce = setTimeout(() => setQuery(searchTerm), 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (cartModalChanged) {
      cartBtnRef.current.click();
    }
  }, [cartModalChanged]);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.length <= 2) return;
    setSearchTerm('');
    navigate(`/search?q=${searchTerm}`);
  }

  return (
    <>
      <div className="bg-[#ffc900]">
        <div className="app-container flex items-center justify-between">
          <p className="text-[15px] font-semibold text-white">
            Explore our special offers with Free gift
          </p>

          <button className="flex items-center gap-2 bg-transparent px-3 py-2 text-[15px] font-semibold text-white">
            <IoMailSharp className="h-5 w-5" /> Subscribe & Save
          </button>
        </div>
      </div>
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="app-container flex h-[80px] items-center justify-between">
          <Link to="/">
            <img src="/logo.png" className="w-40" alt="playsphere-logo" />
          </Link>

          <div className="relative basis-[60%]" ref={ref}>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center rounded-[3px] border border-[#d4d6d8]">
                <input
                  type="search"
                  className="grow rounded-3xl border-solid px-5 py-[10px] font-sans text-sm shadow-sm placeholder:font-sans placeholder:text-[15px] placeholder:text-black focus:outline-none"
                  placeholder="Search our products..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <button className="grid items-center self-stretch rounded-e-[3px] bg-primary px-3">
                  {!isLoading ? (
                    <FiSearch className="h-5 w-5 text-white" />
                  ) : (
                    <SpinnerButton size="small" />
                  )}
                </button>
              </div>
            </form>
            {searchTerm.length > 2 && (
              <SearchBarResults
                items={products?.data}
                refetch={refetch}
                isLoading={isLoading}
                error={error}
                onCloseSearchResults={() => setSearchTerm('')}
                onViewResults={handleSubmit}
              />
            )}
          </div>

          <div className="flex items-center">
            <Modal>
              {!authCtx.isLoggedIn && (
                <Modal.Open opens="login-form">
                  <button className="mr-8 flex items-center gap-[5px] text-base font-semibold text-black">
                    <RiUserLine className="h-[24px] w-[24px]" />
                    Login
                  </button>
                </Modal.Open>
              )}
              {!authCtx.isLoggedIn && (
                <Modal.Window type="right" name="login-form">
                  <AuthFormModal />
                </Modal.Window>
              )}

              {authCtx.isLoggedIn && (
                <li className="group relative mr-8 list-none">
                  <Link
                    to="/account/profile"
                    className="flex items-center gap-2 py-4 font-bold text-black transition-all duration-300 hover:text-primary"
                  >
                    <RiUserFollowLine className="h-6 w-6" />
                    <span className="text-base capitalize">
                      Hi, {firstName}
                    </span>
                    <MdKeyboardArrowDown className="h-[22px] w-[22px]" />
                  </Link>

                  <div className="absolute left-0 top-14 z-10 hidden w-48 rounded-[3px] bg-white text-body shadow-xl group-hover:block">
                    <ul>
                      <li>
                        <Link
                          to="/account/profile"
                          className="flex items-center gap-[10px] whitespace-nowrap py-[10px] pl-3 text-[13px] font-semibold hover:bg-primary/5 hover:text-primary"
                        >
                          <LiaUserSolid className="h-6 w-6 text-black" /> My
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-[10px] whitespace-nowrap py-[10px] pl-3 text-[13px] font-semibold hover:bg-primary/5 hover:text-primary"
                        >
                          <VscPackage className="h-6 w-6 text-black" /> My
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/wishlist"
                          className="flex items-center gap-[10px] whitespace-nowrap py-[10px] pl-3 text-[13px] font-semibold hover:bg-primary/5 hover:text-primary"
                        >
                          <IoIosHeartEmpty className="h-6 w-6 text-black" /> My
                          Saved Items
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/addresses"
                          className="flex items-center gap-[10px] whitespace-nowrap py-[10px] pl-3 text-[13px] font-semibold hover:bg-primary/5 hover:text-primary"
                        >
                          <FaRegAddressCard className="h-5 w-5 text-black" /> My
                          Addresses
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          disabled={isLoggingOut}
                          className="block w-full whitespace-nowrap border-t py-[10px] text-base font-medium text-primary disabled:cursor-not-allowed"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              )}

              <Modal.Open opens="cart">
                <button className="relative" ref={cartBtnRef}>
                  <BsCart4 className="h-7 w-7 text-[#1F1F1F]" />
                  <span className="absolute -right-[9px] -top-[5px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                    {cart.totalQuantity}
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
    </>
  );
}

export default Header;

// when the compound component pattern was used for the header approach
