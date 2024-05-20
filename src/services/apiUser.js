import axios from 'axios';
import { PAGE_SIZE, PLAYSPHERE_API_ROUTE } from '../utils/constants';

export async function getUserAddress() {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/address/getUserAddress`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return res.data;
}

export async function createAddress(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/address`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function updateAddress(addressId, reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'PATCH',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/address/${addressId}`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function deleteAddress(addressId) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'DELETE',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/address/${addressId}`,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function getUserWishlistData(page) {
  const storedToken = localStorage.getItem('auth-token');

  // pagination
  const pageString = `&page=${page}&limit=${PAGE_SIZE}`;

  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/wishlist/getUserWishlistData/?${pageString}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return res.data;
}

export async function createWishlist(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/wishlist`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function deleteWishlist(wishlistId) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'DELETE',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/wishlist/${wishlistId}`,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}
