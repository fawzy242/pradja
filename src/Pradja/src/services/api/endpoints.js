/**
 * API Endpoints Configuration
 * Centralized API endpoint definitions
 * 
 * @module services/api/endpoints
 */

/**
 * API Endpoints
 * Organized by resource/feature
 */
export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },

  // User management endpoints
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPLOAD_AVATAR: '/users/avatar',
  },

  // Property endpoints
  PROPERTIES: {
    LIST: '/properties',
    DETAIL: (id) => `/properties/${id}`,
    CREATE: '/properties',
    UPDATE: (id) => `/properties/${id}`,
    DELETE: (id) => `/properties/${id}`,
    SEARCH: '/properties/search',
    FEATURED: '/properties/featured',
    LATEST: '/properties/latest',
    SIMILAR: (id) => `/properties/${id}/similar`,
    UPLOAD_IMAGES: (id) => `/properties/${id}/images`,
    DELETE_IMAGE: (id, imageId) => `/properties/${id}/images/${imageId}`,
    STATS: '/properties/stats',
    BY_TYPE: '/properties/by-type',
    BY_LOCATION: '/properties/by-location',
  },

  // Agent endpoints
  AGENTS: {
    LIST: '/agents',
    DETAIL: (id) => `/agents/${id}`,
    CREATE: '/agents',
    UPDATE: (id) => `/agents/${id}`,
    DELETE: (id) => `/agents/${id}`,
    SEARCH: '/agents/search',
    FEATURED: '/agents/featured',
    TOP_PERFORMING: '/agents/top-performing',
    PROPERTIES: (id) => `/agents/${id}/properties`,
    STATS: (id) => `/agents/${id}/stats`,
    UPLOAD_PHOTO: (id) => `/agents/${id}/photo`,
    CONTACT: (id) => `/agents/${id}/contact`,
  },

  // Company information endpoints
  COMPANY: {
    INFO: '/company',
    UPDATE: '/company',
    UPLOAD_LOGO: '/company/logo',
    CONTACTS: '/company/contacts',
    SOCIAL_MEDIA: '/company/social-media',
  },

  // Contact/Inquiry endpoints
  CONTACTS: {
    LIST: '/contacts',
    DETAIL: (id) => `/contacts/${id}`,
    CREATE: '/contacts',
    UPDATE: (id) => `/contacts/${id}`,
    DELETE: (id) => `/contacts/${id}`,
    REPLY: (id) => `/contacts/${id}/reply`,
    MARK_READ: (id) => `/contacts/${id}/mark-read`,
    STATS: '/contacts/stats',
  },

  // Dashboard/Analytics endpoints
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    STATS: '/dashboard/stats',
    MONTHLY_SALES: '/dashboard/monthly-sales',
    PROPERTY_TYPES: '/dashboard/property-types',
    RECENT_ACTIVITIES: '/dashboard/recent-activities',
    TOP_AGENTS: '/dashboard/top-agents',
    REVENUE_COMPARISON: '/dashboard/revenue-comparison',
    LOCATION_STATS: '/dashboard/location-stats',
    INQUIRY_STATS: '/dashboard/inquiry-stats',
  },

  // Testimonials endpoints
  TESTIMONIALS: {
    LIST: '/testimonials',
    DETAIL: (id) => `/testimonials/${id}`,
    CREATE: '/testimonials',
    UPDATE: (id) => `/testimonials/${id}`,
    DELETE: (id) => `/testimonials/${id}`,
    FEATURED: '/testimonials/featured',
    APPROVE: (id) => `/testimonials/${id}/approve`,
    REJECT: (id) => `/testimonials/${id}/reject`,
  },

  // File upload endpoints
  FILES: {
    UPLOAD: '/files/upload',
    UPLOAD_MULTIPLE: '/files/upload-multiple',
    DELETE: (id) => `/files/${id}`,
    GET_URL: (id) => `/files/${id}/url`,
  },

  // Settings endpoints
  SETTINGS: {
    GENERAL: '/settings/general',
    UPDATE_GENERAL: '/settings/general',
    EMAIL: '/settings/email',
    UPDATE_EMAIL: '/settings/email',
    NOTIFICATIONS: '/settings/notifications',
    UPDATE_NOTIFICATIONS: '/settings/notifications',
  },

  // Search endpoints
  SEARCH: {
    GLOBAL: '/search',
    PROPERTIES: '/search/properties',
    AGENTS: '/search/agents',
    SUGGESTIONS: '/search/suggestions',
  },

  // Location endpoints
  LOCATIONS: {
    PROVINCES: '/locations/provinces',
    CITIES: (provinceId) => `/locations/provinces/${provinceId}/cities`,
    DISTRICTS: (cityId) => `/locations/cities/${cityId}/districts`,
    POPULAR: '/locations/popular',
  },

  // Notifications endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id) => `/notifications/${id}`,
    MARK_READ: (id) => `/notifications/${id}/mark-read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id) => `/notifications/${id}`,
    DELETE_ALL: '/notifications/delete-all',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Reports endpoints
  REPORTS: {
    SALES: '/reports/sales',
    PROPERTIES: '/reports/properties',
    AGENTS: '/reports/agents',
    INQUIRIES: '/reports/inquiries',
    EXPORT: (type) => `/reports/export/${type}`,
  },
};

/**
 * Build URL with query parameters
 * @param {string} endpoint - Base endpoint
 * @param {object} params - Query parameters
 * @returns {string} URL with query string
 */
export const buildUrl = (endpoint, params = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(`${key}[]`, v));
      } else {
        searchParams.append(key, value);
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

/**
 * Common query parameters
 */
export const QUERY_PARAMS = {
  // Pagination
  PAGE: 'page',
  LIMIT: 'limit',
  OFFSET: 'offset',
  
  // Sorting
  SORT: 'sort',
  ORDER: 'order',
  
  // Filtering
  FILTER: 'filter',
  SEARCH: 'search',
  
  // Date range
  START_DATE: 'start_date',
  END_DATE: 'end_date',
  
  // Status
  STATUS: 'status',
  
  // Include/Expand
  INCLUDE: 'include',
  EXPAND: 'expand',
};

/**
 * Common HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export default ENDPOINTS;
