/**
 * API Services - Index
 * Central export for all API-related functionality
 * 
 * @module services/api
 */

import apiClient, { api, uploadFile, downloadFile } from './client';
import { ENDPOINTS, buildUrl, QUERY_PARAMS, HTTP_STATUS } from './endpoints';
import {
  initializeInterceptors,
  clearInterceptors,
  setupRetryInterceptor,
  setupRateLimitInterceptor,
  setupCacheInterceptor,
  setupDeduplicationInterceptor,
  setupTimeoutInterceptor,
  rateLimiter,
  requestQueue,
  cacheManager,
} from './interceptors';

// Initialize interceptors on import
// Can be customized by calling initializeInterceptors() with options
if (import.meta.env.VITE_ENABLE_API_INTERCEPTORS !== 'false') {
  initializeInterceptors({
    retry: true,
    retryCount: 3,
    retryDelay: 1000,
    rateLimit: true,
    cache: true,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    deduplication: true,
  });
}

/**
 * Export everything
 */
export {
  // Client
  apiClient,
  api,
  uploadFile,
  downloadFile,
  
  // Endpoints
  ENDPOINTS,
  buildUrl,
  QUERY_PARAMS,
  HTTP_STATUS,
  
  // Interceptors
  initializeInterceptors,
  clearInterceptors,
  setupRetryInterceptor,
  setupRateLimitInterceptor,
  setupCacheInterceptor,
  setupDeduplicationInterceptor,
  setupTimeoutInterceptor,
  rateLimiter,
  requestQueue,
  cacheManager,
};

/**
 * Default export - API client
 */
export default api;
