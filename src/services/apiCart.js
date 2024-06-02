import axios from 'axios';
import { PLAYSPHERE_API_ROUTE } from '../utils/constants';

export async function getUserCart(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/cart/getUserCartData`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return res.data;
}

export async function createCart(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/cart`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function updateCart(cartId, reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'PATCH',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/cart/${cartId}`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function deleteCart(cartId) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'DELETE',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/cart/${cartId}`,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function exportLocalStoredCarts() {
  const storedLocalCarts = JSON.parse(localStorage.getItem('cart'));
  const storedToken = localStorage.getItem('auth-token');

  if (!storedLocalCarts || storedLocalCarts.products?.length === 0) {
    return;
  }

  const filteredStoredCarts = storedLocalCarts.products?.map(function (cart) {
    return {
      product: cart.product._id,
      price: cart.price,
      quantity: cart.quantity,
    };
  });

  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/cart/importLocalCartData`,
    data: filteredStoredCarts,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}
