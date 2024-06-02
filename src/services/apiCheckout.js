import axios from 'axios';
import { PLAYSPHERE_API_ROUTE } from '../utils/constants';

export async function createCheckOut(email, amount, order) {
  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/orders/initializePayment`,
    data: {
      email,
      amount,
      order,
    },
  });

  return res.data;
}

export async function verifyPayment(reference) {
  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/orders/verify/${reference}`,
  );

  return res.data;
}

export async function createOrder(order) {
  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/orders`,
    data: order,
  });

  return res.data;
}

export async function getOrder(orderId) {
  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/orders/${orderId}`,
  );

  return res.data;
}
