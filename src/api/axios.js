import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true, // Required for cookies
});

let csrfToken = null;
let isFetchingCsrf = false;
let csrfPromise = null;

// Fetch CSRF token and cache it
const fetchCsrfToken = async () => {
  if (isFetchingCsrf) return csrfPromise; // Avoid duplicate requests
  isFetchingCsrf = true;
  csrfPromise = axios
    .get('http://localhost:3000/csrf-token', { withCredentials: true })
    .then((response) => {
      csrfToken = response.data.csrfToken;
      console.log('CSRF Token fetched:', csrfToken);
      return csrfToken;
    })
    .catch((err) => {
      console.error('Failed to fetch CSRF token:', err.response?.data || err.message);
      throw err;
    })
    .finally(() => {
      isFetchingCsrf = false;
      csrfPromise = null;
    });
  return csrfPromise;
};

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Skip CSRF for GET/HEAD/OPTIONS or /auth routes
    if (
      !['post', 'patch', 'put', 'delete'].includes(config.method.toLowerCase()) ||
      config.url.includes('/auth')
    ) {
      return config;
    }

    // Fetch CSRF token if not already cached
    if (!csrfToken) {
      try {
        await fetchCsrfToken();
      } catch (err) {
        return Promise.reject(new Error('CSRF token fetch failed'));
      }
    }

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken; // Match backend expectation
      console.log('CSRF Token added to request:', csrfToken);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Retry on 403 with refreshed CSRF token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 403 &&
      error.response?.data?.message === 'invalid csrf token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log('CSRF token invalid, refreshing...');
      try {
        await fetchCsrfToken();
        originalRequest.headers['X-XSRF-TOKEN'] = csrfToken;
        return instance(originalRequest); // Retry the original request
      } catch (err) {
        console.error('Failed to refresh CSRF token:', err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;