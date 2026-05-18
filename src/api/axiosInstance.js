import axios from 'axios';

// Create custom Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.medsphere-healthcare.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach JWT Token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medsphere-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling & Expired Sessions
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Intercept 401 Unauthorized (Expired Session) and clear credentials
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('medsphere-token');
      localStorage.removeItem('medsphere-user');
      // Optional: redirect to login
      window.location.href = '/auth';
    }

    // Format uniform error messages
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;
