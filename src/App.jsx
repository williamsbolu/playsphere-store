import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import AuthContext from './auth-context';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Product from './pages/Product';

import HotDeals from './pages/HotDeals';
import GiftCards from './pages/GiftCards';
import Playstation4 from './pages/Playstation4';
import Playstation5 from './pages/Playstation5';
import XboxOne from './pages/XboxOne';
import XboxSeriesX from './pages/XboxSeriesX';
import NintendoSwitch from './pages/NintendoSwitch';
import Cart from './pages/CartPage';
import Checkout from './pages/Checkout';

import Contact from './pages/Contact';
import PageNotFound from './ui/PageNotFound';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import User from './features/user/User';
import Profile from './features/user/Profile';
import WishList from './features/user/wishlist/WishList';
import Orders from './features/user/Orders';
import Addresses from './features/user/address/Addresses';
import ScrollToTop from './ScrollToTop';
import SearchResults from './pages/SearchResults';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:slug" element={<Product />} />

              <Route path="/product-category/deals" element={<HotDeals />} />
              <Route
                path="/product-category/gift-cards"
                element={<GiftCards />}
              />
              <Route
                path="/product-category/playstation-4"
                element={<Playstation4 />}
              />
              <Route
                path="/product-category/playstation-4/ps4-consoles-and-accessories"
                element={<Product />}
              />
              <Route
                path="/product-category/playstation-4/playstation-4-games"
                element={<Product />}
              />
              <Route
                path="/product-category/playstation-5"
                element={<Playstation5 />}
              />
              <Route
                path="/product-category/playstation-5/ps5-consoles-and-accessories"
                element={<Product />}
              />
              <Route
                path="/product-category/playstation-5/playstation-5-games"
                element={<Product />}
              />
              <Route path="/product-category/xbox-one" element={<XboxOne />} />
              <Route
                path="/product-category/xbox-one/xbox-one-consoles-and-accessories"
                element={<Product />}
              />
              <Route
                path="/product-category/xbox-one/xbox-one-games"
                element={<Product />}
              />
              <Route
                path="/product-category/xbox-series-x"
                element={<XboxSeriesX />}
              />
              <Route
                path="/product-category/xbox-series-x/xbox-series-x-consoles-and-accessories"
                element={<Product />}
              />
              <Route
                path="/product-category/xbox-series-x/xbox-series-x-games"
                element={<Product />}
              />
              <Route
                path="/product-category/nintendo-switch"
                element={<NintendoSwitch />}
              />
              <Route
                path="/product-category/nintendo-switch/nintendo-switch-consoles-and-accessories"
                element={<Product />}
              />
              <Route
                path="/product-category/nintendo-switch/nintendo-switch-games"
                element={<Product />}
              />
              {authCtx.isLoggedIn && (
                <Route path="/account" element={<User />}>
                  <Route index element={<Navigate to="profile" />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="wishlist" element={<WishList />} />
                  <Route path="addresses" element={<Addresses />} />
                </Route>
              )}
              {!authCtx.isLoggedIn && (
                <Route
                  path="/account/*"
                  element={<Navigate to="/auth/sign-in" />}
                />
              )}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {!authCtx.isLoggedIn ? (
              <Route path="auth/sign-up" element={<SignUp />} />
            ) : (
              <Route path="auth/sign-up" element={<Navigate to="/account" />} />
            )}
            {!authCtx.isLoggedIn ? (
              <Route path="auth/sign-in" element={<Login />} />
            ) : (
              <Route
                path="/auth/sign-in"
                element={<Navigate to="/account" />}
              />
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '14px',
            maxWidth: '500px',
            padding: '10px 15px',
            backgroundColor: '#ffffff',
            color: '#1F1F1F',
            borderRadius: '3px',
          },
        }}
      />
    </>
  );
}

export default App;
