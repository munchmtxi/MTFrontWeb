import axios from 'axios';
import store from '../store';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
});

let csrfToken = null, isFetchingCsrf = false, csrfPromise = null;

const fetchCsrfToken = async () => {
  if (isFetchingCsrf) return csrfPromise;
  isFetchingCsrf = true;
  console.log('Fetching CSRF token...');
  csrfPromise = instance.get('/csrf-token', { withCredentials: true })
    .then(res => {
      csrfToken = res.data.csrfToken;
      console.log('CSRF Token fetched:', csrfToken);
      return csrfToken || Promise.reject(new Error('CSRF token not found'));
    })
    .catch(err => {
      console.error('Failed to fetch CSRF token:', err.response?.data || err.message);
      return Promise.reject(err);
    })
    .finally(() => {
      isFetchingCsrf = false;
      csrfPromise = null;
    });
  return csrfPromise;
};

instance.interceptors.request.use(async config => {
  const token = store.getState().auth.token || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('JWT Token added to request:', token);
  }
  if (['post', 'patch', 'put', 'delete'].includes(config.method.toLowerCase()) && 
      !config.url.includes('/auth') && 
      !config.url.includes('/csrf-token')) {
    if (!csrfToken) await fetchCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
      console.log('CSRF Token added to request:', csrfToken);
    } else {
      console.warn('No CSRF token available');
    }
  }
  return config;
}, error => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => {
    console.log('Response received:', response.data);
    return response;
  },
  async error => {
    const { config, response } = error;
    console.error('Response error:', {
      status: response?.status,
      data: response?.data,
      message: error.message,
    });
    if (response?.status === 403 && response?.data?.message === 'Invalid CSRF token' && !config._retry) {
      config._retry = true;
      console.log('CSRF token invalid, refreshing...');
      await fetchCsrfToken();
      config.headers['X-CSRF-Token'] = csrfToken;
      return instance(config);
    }
    return Promise.reject(error);
  }
);

export const requestRide = async (pickup, dropoff, rideType) => {
  try {
    const response = await instance.post('/api/v1/rides/request', {
      pickup,
      dropoff,
      rideType,
    });
    return response.data; // Returns { status, data: { ride } }
  } catch (error) {
    console.error('Ride request failed:', error.response?.data || error.message);
    throw error;
  }
};

export default instance;