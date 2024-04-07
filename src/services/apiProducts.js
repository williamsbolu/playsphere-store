import axios from 'axios';
import { PAGE_SIZE, PLAYSPHERE_API_ROUTE } from '../utils/constants';

export async function getAllProducts({ params, sortBy, page }) {
  // sort
  const sortByString = `&sort=${sortBy.direction === 'desc' ? `-${sortBy.field}` : sortBy.field}`;

  // pagination
  const pageString = `&page=${page}&limit=${PAGE_SIZE}`;

  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/products/?${params}${sortByString}${pageString}`,
  );

  return res.data;
}

export async function getProduct(slug) {
  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/products/product/${slug}`,
  );

  return res.data.data;
}

export async function getHotDeals() {
  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/products/hot-deals`,
  );

  return res.data.data;
}

export async function getRecentProducts() {
  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/products/recently-added`,
  );

  return res.data.data;
}
