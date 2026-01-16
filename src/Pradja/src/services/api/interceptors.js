/**
 * API Interceptors
 * Advanced request/response interceptors for specific use cases
 * 
 * @module services/api/interceptors
 */

import apiClient from './client';

/**
 * Request rate limiter
 * Prevents too many requests in a short time
 */
class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }

  reset() {
    this.requests = [];
  }
}

const rateLimiter = new RateLimiter(50, 10000); // 50 requests per 10 seconds

/**
 * Request queue for retry logic
 */
class RequestQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { request, resolve, reject } = this.queue.shift();
      
      try {
        const response = await apiClient(request);
        resolve(response);
      } catch (error) {
        reject(error);
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.isProcessing = false;
  }

  clear() {
    this.queue = [];
  }
}

const requestQueue = new RequestQueue();

/**
 * Cache manager for GET requests
 */
class CacheManager {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  generateKey(url, params) {
    return `${url}?${JSON.stringify(params || {})}`;
  }

  get(url, params) {
    const key = this.generateKey(url, params);
    const cached = this.cache.get(key);

    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set(url, params, data) {
    const key = this.generateKey(url, params);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(url) {
    if (url) {
      // Clear specific URL
      const keysToDelete = [];
      for (const key of this.cache.keys()) {
        if (key.startsWith(url)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      // Clear all cache
      this.cache.clear();
    }
  }
}

const cacheManager = new CacheManager();

/**
 * Retry interceptor
 * Automatically retries failed requests
 */
export const setupRetryInterceptor = (maxRetries = 3, retryDelay = 1000) => {
  apiClient.interceptors.response.use(
    response => response,
    async error => {
      const config = error.config;

      // Don't retry if already retried max times
      if (!config || !config.retry || config.retryCount >= maxRetries) {
        return Promise.reject(error);
      }

      // Increment retry count
      config.retryCount = config.retryCount || 0;
      config.retryCount += 1;

      // Calculate delay with exponential backoff
      const delay = retryDelay * Math.pow(2, config.retryCount - 1);

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));

      // Log retry attempt
      if (import.meta.env.DEV) {
        console.log(`[API Retry] Attempt ${config.retryCount}/${maxRetries} for ${config.url}`);
      }

      // Retry request
      return apiClient(config);
    }
  );
};

/**
 * Rate limiting interceptor
 * Prevents too many requests
 */
export const setupRateLimitInterceptor = () => {
  apiClient.interceptors.request.use(
    config => {
      if (!rateLimiter.canMakeRequest()) {
        return Promise.reject(new Error('Rate limit exceeded. Please slow down.'));
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

/**
 * Caching interceptor for GET requests
 * Caches successful GET responses
 */
export const setupCacheInterceptor = (ttl) => {
  if (ttl) {
    cacheManager.ttl = ttl;
  }

  // Request interceptor - check cache
  apiClient.interceptors.request.use(
    config => {
      // Only cache GET requests
      if (config.method?.toLowerCase() === 'get' && config.cache !== false) {
        const cached = cacheManager.get(config.url, config.params);
        if (cached) {
          if (import.meta.env.DEV) {
            console.log(`[API Cache] Hit for ${config.url}`);
          }
          // Return cached response
          return Promise.reject({
            config,
            data: cached,
            status: 200,
            statusText: 'OK',
            headers: {},
            cached: true,
          });
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor - save to cache
  apiClient.interceptors.response.use(
    response => {
      // Cache GET requests
      if (response.config.method?.toLowerCase() === 'get' && response.config.cache !== false) {
        cacheManager.set(response.config.url, response.config.params, response.data);
        if (import.meta.env.DEV) {
          console.log(`[API Cache] Saved for ${response.config.url}`);
        }
      }
      return response;
    },
    error => {
      // Return cached response if available
      if (error.cached) {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  );
};

/**
 * Request deduplication interceptor
 * Prevents duplicate requests
 */
const pendingRequests = new Map();

export const setupDeduplicationInterceptor = () => {
  // Request interceptor
  apiClient.interceptors.request.use(
    config => {
      const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
      
      // Check if request is already pending
      if (pendingRequests.has(requestKey)) {
        if (import.meta.env.DEV) {
          console.log(`[API Dedup] Duplicate request blocked: ${config.url}`);
        }
        // Return the pending promise
        return pendingRequests.get(requestKey);
      }

      // Store the config with a promise
      const requestPromise = new Promise((resolve, reject) => {
        config.resolve = resolve;
        config.reject = reject;
      });
      
      pendingRequests.set(requestKey, requestPromise);
      
      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    response => {
      const requestKey = `${response.config.method}:${response.config.url}:${JSON.stringify(response.config.params || {})}`;
      pendingRequests.delete(requestKey);
      
      // Resolve any waiting promises
      if (response.config.resolve) {
        response.config.resolve(response);
      }
      
      return response;
    },
    error => {
      const config = error.config;
      if (config) {
        const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
        pendingRequests.delete(requestKey);
        
        // Reject any waiting promises
        if (config.reject) {
          config.reject(error);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

/**
 * Request timeout interceptor with custom timeouts per endpoint
 */
export const setupTimeoutInterceptor = (timeouts = {}) => {
  apiClient.interceptors.request.use(
    config => {
      // Check if there's a custom timeout for this endpoint
      const endpoint = config.url.split('?')[0];
      if (timeouts[endpoint]) {
        config.timeout = timeouts[endpoint];
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

/**
 * Initialize all interceptors
 */
export const initializeInterceptors = (options = {}) => {
  const {
    retry = true,
    retryCount = 3,
    retryDelay = 1000,
    rateLimit = true,
    cache = true,
    cacheTTL = 5 * 60 * 1000,
    deduplication = true,
    customTimeouts = {},
  } = options;

  if (retry) {
    setupRetryInterceptor(retryCount, retryDelay);
  }

  if (rateLimit) {
    setupRateLimitInterceptor();
  }

  if (cache) {
    setupCacheInterceptor(cacheTTL);
  }

  if (deduplication) {
    setupDeduplicationInterceptor();
  }

  if (Object.keys(customTimeouts).length > 0) {
    setupTimeoutInterceptor(customTimeouts);
  }

  if (import.meta.env.DEV) {
    console.log('[API Interceptors] Initialized', options);
  }
};

/**
 * Clear all interceptor states
 */
export const clearInterceptors = () => {
  rateLimiter.reset();
  requestQueue.clear();
  cacheManager.clear();
  pendingRequests.clear();
  
  if (import.meta.env.DEV) {
    console.log('[API Interceptors] Cleared all states');
  }
};

export {
  rateLimiter,
  requestQueue,
  cacheManager,
};
