import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Fetch CSRF token only if not hitting /auth routes
    if (
      ['POST', 'PATCH', 'PUT', 'DELETE'].includes(config.method.toUpperCase()) &&
      !config.url.includes('/auth')
    ) {
      try {
        const csrfResponse = await instance.get('/csrf-token');
        config.headers['X-CSRF-Token'] = csrfResponse.data.csrfToken;
        console.log('CSRF Token added to request:', csrfResponse.data.csrfToken);
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err.response?.data || err.message);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;