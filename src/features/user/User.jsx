import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { useLogout } from '../authentication/useLogout';
import SpinnerButton from '../../ui/SpinnerButton';

function User() {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout();

  const logOutHandler = () => {
    logout(null, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <section className="app-container grid grid-cols-[300px_1fr] gap-20 py-16">
      <div className="grid gap-6 self-start">
        <ul className="grid rounded-[3px] border border-[#e1e3e4] bg-white">
          <li>
            <NavLink
              to="/account/profile"
              className={({ isActive }) =>
                `block rounded-t-[3px] px-6 py-4 text-[13px] uppercase transition-all duration-300 ${isActive && 'bg-[#101010] text-white'} ${!isActive && 'bg-stone-50/70 font-semibold text-black hover:bg-stone-200/55'}`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                `block px-6 py-4 text-[13px] uppercase transition-all duration-300 ${isActive && 'bg-[#101010] text-white'} ${!isActive && 'bg-stone-50/70 font-semibold text-black hover:bg-stone-200/55'}`
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account/wishlist"
              className={({ isActive }) =>
                `block px-6 py-4 text-[13px] uppercase transition-all duration-300 ${isActive && 'bg-[#101010] text-white'} ${!isActive && 'bg-stone-50/70 font-semibold text-black hover:bg-stone-200/55'}`
              }
            >
              My Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account/addresses"
              className={({ isActive }) =>
                `block rounded-b-[3px] px-6 py-4 text-[13px] uppercase transition-all duration-300 ${isActive && 'bg-[#101010] text-white'} ${!isActive && 'bg-stone-50/70 font-semibold text-black hover:bg-stone-200/55'}`
              }
            >
              My Addresses
            </NavLink>
          </li>
        </ul>

        <Button onClick={logOutHandler} disabled={isLoggingOut}>
          {isLoggingOut ? <SpinnerButton /> : 'Logout'}
        </Button>
      </div>

      <Outlet />
    </section>
  );
}

export default User;
