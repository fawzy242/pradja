/**
 * Mock Services Export
 * Re-exports all mock services for easy importing
 */

// Import default exports from service files
import authServiceDefault from './authService.js';
import agentServiceDefault from './agentService.js';
import dashboardServiceDefault from './dashboardService.js';

// Import named and default exports from other service files
import * as propertyServiceModule from './propertyService.js';
import * as companyServiceModule from './companyService.js';

// Re-export as named exports
export const authService = authServiceDefault;
export const agentService = agentServiceDefault;
export const dashboardService = dashboardServiceDefault;
export const propertyService = propertyServiceModule.default || propertyServiceModule;
export const companyService = companyServiceModule.default || companyServiceModule;

// Also export individual functions from propertyService
export const {
  getAllProperties,
  getPropertyById,
  getFeaturedProperties,
  getSimilarProperties,
  getPropertyStatistics,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyFeatured,
  togglePropertyPublished,
  togglePropertyLike,
} = propertyServiceModule;

// Also export individual functions from companyService
export const {
  getCompanyInfo,
  updateCompanyInfo,
} = companyServiceModule;

// Default export for convenience
export default {
  authService,
  agentService,
  dashboardService,
  propertyService,
  companyService,
};
