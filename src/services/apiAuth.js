import axios from 'axios';
import { PLAYSPHERE_API_ROUTE } from '../utils/constants';

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
}) {
  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/users/signup`,
    data: { firstName, lastName, email, password, passwordConfirm },
  });

  return res.data;
}

export async function login(email, password) {
  const res = await axios({
    method: 'POST',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/users/login`,
    data: { email, password },
  });

  return res.data;
}

export async function isLoggedIn() {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios.get(
    `${PLAYSPHERE_API_ROUTE}/api/v1/users/getLoggedInStatus`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return res.data;
}

export async function logout() {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios.get(`${PLAYSPHERE_API_ROUTE}/api/v1/users/logout`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function updateCurrentUser(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'PATCH',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/users/updateMe`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}

export async function changePassword(reqBody) {
  const storedToken = localStorage.getItem('auth-token');

  const res = await axios({
    method: 'PATCH',
    url: `${PLAYSPHERE_API_ROUTE}/api/v1/users/updateMyPassword`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return res.data;
}
