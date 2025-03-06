import { useMutation } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/auth'; // Backend base URL
const TWOFA_URL = 'http://localhost:3000/2fa'; // 2FA-specific base URL

export const useRegister = () =>
  useMutation((data) =>
    axios.post(`${BASE_URL}/register`, data).then((res) => res.data.data)
  );

export const useLogin = () =>
  useMutation((data) =>
    axios.post(`${BASE_URL}/login`, data).then((res) => res.data.data)
  );

export const useMerchantLogin = () =>
  useMutation((data) =>
    axios.post(`${BASE_URL}/merchant/login`, data).then((res) => res.data.data)
  );

export const useRefreshToken = () =>
  useMutation((refreshToken) =>
    axios.post(`${BASE_URL}/token`, { refreshToken }).then((res) => res.data.data)
  );

export const useLogout = () =>
  useMutation((data) =>
    axios.post(`${BASE_URL}/merchant/logout`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then((res) => res.data)
  );

export const useSetup2FA = () =>
  useMutation(() =>
    axios.post(
      `${TWOFA_URL}/setup`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    ).then((res) => res.data.data)
  );

export const useVerify2FA = () =>
  useMutation((data) =>
    axios.post(`${TWOFA_URL}/verify`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then((res) => res.data)
  );