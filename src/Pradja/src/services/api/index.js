/**
 * Main API Service Export
 * Simple and clean exports
 */

import { authAPI } from './auth.api.js';
import { assetAPI } from './asset.api.js';
import { employeeAPI } from './employee.api.js';
import { categoryAPI } from './category.api.js';
import { assetTransactionsAPI } from './asset-transactions.api.js';
import { reportsAPI } from './reports.api.js';
import { axiosInstance } from './axios.instance.js';
import { StorageService } from '../storage.service.js';

// Helper functions
const logout = () => {
  StorageService.clearAuth();
  return { success: true, message: 'Logged out successfully' };
};

const checkHealth = async () => {
  try {
    const response = await axiosInstance.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const testConnection = async () => {
  console.log('🔍 Testing API Connection...');
  console.log('📍 Current Origin:', window.location.origin);
  console.log('🌐 Base URL:', axiosInstance.defaults.baseURL || '(relative paths)');
  console.log('🔑 Has Token:', !!StorageService.getToken());

  try {
    const health = await checkHealth();
    console.log('✅ API Connection Successful:', health);
    return { success: true, data: health };
  } catch (error) {
    console.error('❌ API Connection Failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Test untuk semua endpoint
const testAllEndpoints = async () => {
  console.group('🧪 Testing All API Endpoints');
  const results = {
    auth: false,
    asset: false,
    employee: false,
    category: false,
    transactions: false,
    reports: false,
  };

  try {
    // Test auth
    console.log('1. Testing auth endpoint...');
    try {
      await authAPI.getMe();
      results.auth = true;
      console.log('✅ Auth endpoint OK');
    } catch (e) {
      console.log('⚠️ Auth endpoint not accessible (might need login)');
    }

    // Test asset
    console.log('2. Testing asset endpoint...');
    try {
      await assetAPI.getAssetsGrid({ page: 1, pageSize: 1 });
      results.asset = true;
      console.log('✅ Asset endpoint OK');
    } catch (e) {
      console.error('❌ Asset endpoint failed:', e.message);
    }

    // Test employee
    console.log('3. Testing employee endpoint...');
    try {
      await employeeAPI.getEmployeesGrid({ page: 1, pageSize: 1 });
      results.employee = true;
      console.log('✅ Employee endpoint OK');
    } catch (e) {
      console.error('❌ Employee endpoint failed:', e.message);
    }

    // Test category
    console.log('4. Testing category endpoint...');
    try {
      await categoryAPI.getCategories();
      results.category = true;
      console.log('✅ Category endpoint OK');
    } catch (e) {
      console.error('❌ Category endpoint failed:', e.message);
    }

    // Test transactions
    console.log('5. Testing transactions endpoint...');
    try {
      await assetTransactionsAPI.getTransactions();
      results.transactions = true;
      console.log('✅ Transactions endpoint OK');
    } catch (e) {
      console.error('❌ Transactions endpoint failed:', e.message);
    }

    // Test reports
    console.log('6. Testing reports endpoint...');
    try {
      await reportsAPI.getReportData();
      results.reports = true;
      console.log('✅ Reports endpoint OK');
    } catch (e) {
      console.error('❌ Reports endpoint failed:', e.message);
    }

    console.log('📊 Final Results:', results);
    return results;

  } catch (error) {
    console.error('❌ Test suite failed:', error);
    return results;
  } finally {
    console.groupEnd();
  }
};

// Main API object
const PradjaAPI = {
  // Individual services
  auth: authAPI,
  asset: assetAPI,
  employee: employeeAPI,
  category: categoryAPI,
  transactions: assetTransactionsAPI,
  reports: reportsAPI,

  // Helper functions
  logout,
  checkHealth,
  testConnection,
  testAllEndpoints,

  // Axios instance for advanced use
  axios: axiosInstance,

  // Storage service
  storage: StorageService,
  
  // Quick helpers
  downloadReport: () => reportsAPI.downloadExcelReport(),
  getToken: () => StorageService.getToken(),
  clearAuth: () => logout(),
};

// Export individual services (for direct import)
export { 
  authAPI, 
  assetAPI, 
  employeeAPI, 
  categoryAPI, 
  assetTransactionsAPI, 
  reportsAPI, 
  axiosInstance 
};

// Export main API object
export default PradjaAPI;

// Debug helpers in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.PradjaAPI = PradjaAPI;

  // Console helpers
  window.testAPI = () => PradjaAPI.testConnection();
  window.testAllEndpoints = () => PradjaAPI.testAllEndpoints();
  window.getToken = () => StorageService.getToken();
  window.clearAuth = () => PradjaAPI.logout();
  window.downloadNow = () => PradjaAPI.downloadReport();

  console.log('🔧 PradjaAPI loaded for debugging');
  console.log('Available test commands:');
  console.log('- testAPI() - Test connection');
  console.log('- testAllEndpoints() - Test all endpoints');
  console.log('- downloadNow() - Quick download');
}