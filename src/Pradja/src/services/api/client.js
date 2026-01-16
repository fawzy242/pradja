/**
 * API Client Configuration
 * Axios-based HTTP client for backend communication
 * 
 * @module services/api/client
 */

import axios from 'axios';

// Get configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor
 * - Add authentication token to requests
 * - Add request timestamp
 * - Log requests in development
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp
    config.metadata = { startTime: new Date().getTime() };

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    // Log request errors
    if (import.meta.env.DEV) {
      console.error('[API Request Error]', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Handle successful responses
 * - Handle error responses
 * - Log response time in development
 * - Refresh token if expired
 */
apiClient.interceptors.response.use(
  (response) => {
    // Calculate response time
    const duration = new Date().getTime() - response.config.metadata.startTime;

    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        duration: `${duration}ms`,
        data: response.data,
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error responses
    if (import.meta.env.DEV) {
      console.error('[API Response Error]', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token } = response.data;
          localStorage.setItem('auth_token', token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      // User doesn't have permission
      console.error('Access denied');
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }

    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network error - please check your connection');
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }

    return Promise.reject(error);
  }
);

/**
 * Generic request methods
 */
export const api = {
  /**
   * GET request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise} Response data
   */
  get: (url, config = {}) => apiClient.get(url, config).then(res => res.data),

  /**
   * POST request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios config
   * @returns {Promise} Response data
   */
  post: (url, data = {}, config = {}) => apiClient.post(url, data, config).then(res => res.data),

  /**
   * PUT request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios config
   * @returns {Promise} Response data
   */
  put: (url, data = {}, config = {}) => apiClient.put(url, data, config).then(res => res.data),

  /**
   * PATCH request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios config
   * @returns {Promise} Response data
   */
  patch: (url, data = {}, config = {}) => apiClient.patch(url, data, config).then(res => res.data),

  /**
   * DELETE request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise} Response data
   */
  delete: (url, config = {}) => apiClient.delete(url, config).then(res => res.data),
};

/**
 * File upload helper
 * @param {string} url - Upload endpoint
 * @param {FormData} formData - Form data with files
 * @param {Function} onProgress - Progress callback
 * @returns {Promise} Response data
 */
export const uploadFile = (url, formData, onProgress) => {
  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  }).then(res => res.data);
};

/**
 * Download file helper
 * @param {string} url - Download endpoint
 * @param {string} filename - Desired filename
 * @returns {Promise} Void
 */
export const downloadFile = async (url, filename) => {
  const response = await apiClient.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

export default apiClient;
