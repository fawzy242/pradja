/**
 * Application Constants
 * Configuration values and constants used throughout the app
 */

// App Info
export const APP_NAME = 'PT Pradja Artha Sejahtera';
export const APP_SHORT_NAME = 'Pradja Artha';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Leading real estate company in Indonesia';

// API Configuration (Mock)
export const API_BASE_URL = 'https://api.pradjaartha.com/v1';
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// File Upload
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Property Types
export const PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'Land'];

// Property Status
export const PROPERTY_STATUS = ['For Sale', 'For Rent', 'Sold', 'Rented'];

// Bedroom Options
export const BEDROOM_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

// Bathroom Options
export const BATHROOM_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' }
];

// Agent Specializations
export const AGENT_SPECIALIZATIONS = [
  'Residential',
  'Commercial',
  'Luxury',
  'Investment'
];

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' }
];

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/pradjaartha',
  INSTAGRAM: 'https://instagram.com/pradjaartha',
  TWITTER: 'https://twitter.com/pradjaartha',
  LINKEDIN: 'https://linkedin.com/company/pradja-artha-sejahtera',
  YOUTUBE: 'https://youtube.com/@pradjaartha'
};

// Contact Info
export const CONTACT = {
  EMAIL: 'info@pradjaartha.com',
  PHONE: '+62 21 1234 5678',
  WHATSAPP: '+62 812 9999 8888',
  ADDRESS: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220, Indonesia'
};

// Map
export const MAP_CENTER = {
  lat: -6.2088,
  lng: 106.8456
};

// Date Formats
export const DATE_FORMAT = 'DD MMM YYYY';
export const DATETIME_FORMAT = 'DD MMM YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Currency
export const CURRENCY = 'IDR';
export const CURRENCY_SYMBOL = 'Rp';
export const CURRENCY_LOCALE = 'id-ID';

// Breakpoints (must match SCSS)
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  MAXIMUM: 9999
};

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 7000
};

// Animation Duration
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'i18nextLng',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  USER: 'user'
};

// Environment
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

export default {
  APP_NAME,
  APP_SHORT_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_BASE_URL,
  API_TIMEOUT,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  MAX_FILE_SIZE_MB,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  PROPERTY_TYPES,
  PROPERTY_STATUS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  SORT_OPTIONS,
  AGENT_SPECIALIZATIONS,
  LANGUAGES,
  SOCIAL_MEDIA,
  CONTACT,
  MAP_CENTER,
  DATE_FORMAT,
  DATETIME_FORMAT,
  TIME_FORMAT,
  CURRENCY,
  CURRENCY_SYMBOL,
  CURRENCY_LOCALE,
  BREAKPOINTS,
  Z_INDEX,
  TOAST_DURATION,
  ANIMATION_DURATION,
  STORAGE_KEYS,
  USER_ROLES,
  IS_DEV,
  IS_PROD
};
