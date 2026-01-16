/**
 * Route Constants
 * Centralized route paths for consistent navigation
 * 
 * Usage:
 * import { ROUTES } from '@/config/routes';
 * navigate(ROUTES.HOME);
 */

// Public Routes
export const ROUTES = {
  // Main
  HOME: '/',
  
  // Properties
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  getPropertyDetail: (id) => `/properties/${id}`,
  
  // Agents
  AGENTS: '/agents',
  AGENT_DETAIL: '/agents/:id',
  getAgentDetail: (id) => `/agents/${id}`,
  
  // Company
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Legal
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  
  // Admin Auth
  ADMIN_LOGIN: '/admin/login',
  ADMIN_FORGOT_PASSWORD: '/admin/forgot-password',
  
  // Admin Panel
  ADMIN_DASHBOARD: '/admin/dashboard',
  
  // Admin Properties
  ADMIN_PROPERTIES: '/admin/properties',
  ADMIN_PROPERTIES_CREATE: '/admin/properties/create',
  ADMIN_PROPERTIES_EDIT: '/admin/properties/edit/:id',
  getAdminPropertiesEdit: (id) => `/admin/properties/edit/${id}`,
  
  // Admin Agents
  ADMIN_AGENTS: '/admin/agents',
  ADMIN_AGENTS_CREATE: '/admin/agents/create',
  ADMIN_AGENTS_EDIT: '/admin/agents/edit/:id',
  getAdminAgentsEdit: (id) => `/admin/agents/edit/${id}`,
  
  // Admin Settings
  ADMIN_COMPANY_INFO: '/admin/company-info',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Error
  NOT_FOUND: '/404',
  ERROR: '/error',
};

// Route Groups for easier management
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PROPERTIES,
  ROUTES.PROPERTY_DETAIL,
  ROUTES.AGENTS,
  ROUTES.AGENT_DETAIL,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.PRIVACY_POLICY,
  ROUTES.TERMS_OF_SERVICE,
];

export const AUTH_ROUTES = [
  ROUTES.ADMIN_LOGIN,
  ROUTES.ADMIN_FORGOT_PASSWORD,
];

export const ADMIN_ROUTES = [
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_PROPERTIES,
  ROUTES.ADMIN_PROPERTIES_CREATE,
  ROUTES.ADMIN_PROPERTIES_EDIT,
  ROUTES.ADMIN_AGENTS,
  ROUTES.ADMIN_AGENTS_CREATE,
  ROUTES.ADMIN_AGENTS_EDIT,
  ROUTES.ADMIN_COMPANY_INFO,
  ROUTES.ADMIN_PROFILE,
  ROUTES.ADMIN_SETTINGS,
];

// Helper to check if route is admin route
export const isAdminRoute = (pathname) => {
  return pathname.startsWith('/admin') && !AUTH_ROUTES.includes(pathname);
};

// Helper to check if route is auth route
export const isAuthRoute = (pathname) => {
  return AUTH_ROUTES.includes(pathname);
};

// Helper to check if route is public route
export const isPublicRoute = (pathname) => {
  return !isAdminRoute(pathname) && !isAuthRoute(pathname);
};

export default ROUTES;
