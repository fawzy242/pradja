/**
 * Agent Service (Mock)
 * Mock API service for agent operations
 */

import { agents as initialAgents, agentStats } from '../../data';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

let agentsStore = [...initialAgents];

export const agentService = {
  /**
   * Get all agents
   */
  getAllAgents: async (params = {}) => {
    await delay();
    
    const {
      page = 1,
      limit = 10,
      search = '',
      specialization = 'all',
      featured,
      active
    } = params;
    
    let filtered = [...agentsStore];
    
    // Search
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.specialization.toLowerCase().includes(query) ||
        a.bio.toLowerCase().includes(query)
      );
    }
    
    // Filter by specialization
    if (specialization && specialization !== 'all') {
      filtered = filtered.filter(a => a.specialization === specialization);
    }
    
    // Filter by featured
    if (featured !== undefined) {
      filtered = filtered.filter(a => a.featured === Boolean(featured));
    }
    
    // Filter by active
    if (active !== undefined) {
      filtered = filtered.filter(a => a.active === Boolean(active));
    }
    
    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);
    
    return {
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages
      }
    };
  },
  
  /**
   * Get agent by ID
   */
  getAgentById: async (id) => {
    await delay(300);
    
    const agent = agentsStore.find(a => a.id === Number(id));
    
    if (!agent) {
      throw new Error('Agent not found');
    }
    
    return agent;
  },
  
  /**
   * Get featured agents
   */
  getFeaturedAgents: async (limit = 4) => {
    await delay(300);
    
    return agentsStore
      .filter(a => a.featured && a.active)
      .sort((a, b) => b.propertiesSold - a.propertiesSold)
      .slice(0, limit);
  },
  
  /**
   * Get agent statistics
   */
  getAgentStatistics: async () => {
    await delay(200);
    return agentStats;
  }
};

// ============================================================================
// AUTH SERVICE (Mock)
// ============================================================================

import { users } from '../../data/additional.data';

export const authService = {
  /**
   * Login user
   */
  login: async (email, password) => {
    await delay(1000);
    
    const user = users.find(u => 
      u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Generate mock token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  },
  
  /**
   * Logout user
   */
  logout: async () => {
    await delay(300);
    // Clear token (handled in client)
    return true;
  },
  
  /**
   * Verify token
   */
  verifyToken: async (token) => {
    await delay(200);
    
    if (!token || !token.startsWith('mock-jwt-token')) {
      throw new Error('Invalid token');
    }
    
    // Extract user ID from token
    const parts = token.split('-');
    const userId = Number(parts[3]);
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  },
  
  /**
   * Get current user
   */
  getCurrentUser: async () => {
    await delay(200);
    
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      throw new Error('Not authenticated');
    }
    
    return JSON.parse(userData);
  },
  
  /**
   * Update profile
   */
  updateProfile: async (userId, updates) => {
    await delay(500);
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    Object.assign(user, updates);
    
    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  },
  
  /**
   * Change password
   */
  changePassword: async (userId, oldPassword, newPassword) => {
    await delay(500);
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== oldPassword) {
      throw new Error('Old password is incorrect');
    }
    
    user.password = newPassword;
    
    return true;
  },
  
  /**
   * Forgot password
   */
  forgotPassword: async (email) => {
    await delay(800);
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, reset link has been sent' };
    }
    
    // In real app, send email with reset link
    return { message: 'Password reset link sent to email' };
  }
};

// ============================================================================
// DASHBOARD SERVICE (Mock)
// ============================================================================

import { dashboardData } from '../../data/additional.data';

export const dashboardService = {
  /**
   * Get dashboard overview
   */
  getOverview: async () => {
    await delay(500);
    return dashboardData.stats;
  },
  
  /**
   * Get recent properties
   */
  getRecentProperties: async (limit = 5) => {
    await delay(300);
    return dashboardData.recentProperties.slice(0, limit);
  },
  
  /**
   * Get sales chart data
   */
  getSalesChart: async (period = '6months') => {
    await delay(400);
    return dashboardData.salesChart;
  },
  
  /**
   * Get property types distribution
   */
  getPropertyTypes: async () => {
    await delay(300);
    return dashboardData.propertyTypes;
  },
  
  /**
   * Get top agents
   */
  getTopAgents: async (limit = 5) => {
    await delay(300);
    return dashboardData.topAgents.slice(0, limit);
  },
  
  /**
   * Get recent activities
   */
  getRecentActivities: async (limit = 10) => {
    await delay(300);
    return dashboardData.recentActivities.slice(0, limit);
  },
  
  /**
   * Get monthly goals
   */
  getMonthlyGoals: async () => {
    await delay(200);
    return dashboardData.monthlyGoals;
  }
};

// ============================================================================
// COMPANY SERVICE (Mock)
// ============================================================================

import { companyInfo, testimonials } from '../../data/additional.data';

export const companyService = {
  /**
   * Get company information
   */
  getCompanyInfo: async () => {
    await delay(300);
    return companyInfo;
  },
  
  /**
   * Update company information (Admin)
   */
  updateCompanyInfo: async (updates) => {
    await delay(500);
    Object.assign(companyInfo, updates);
    return companyInfo;
  },
  
  /**
   * Get testimonials
   */
  getTestimonials: async (params = {}) => {
    await delay(300);
    
    const { featured, limit = 10 } = params;
    
    let filtered = [...testimonials];
    
    if (featured !== undefined) {
      filtered = filtered.filter(t => t.featured === Boolean(featured));
    }
    
    return filtered.slice(0, limit);
  },
  
  /**
   * Submit contact form
   */
  submitContactForm: async (formData) => {
    await delay(800);
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Missing required fields');
    }
    
    // In real app, send email or save to database
    console.log('Contact form submitted:', formData);
    
    return {
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.'
    };
  },
  
  /**
   * Submit property inquiry
   */
  submitPropertyInquiry: async (propertyId, inquiryData) => {
    await delay(800);
    
    // In real app, send notification to agent
    console.log('Property inquiry submitted:', { propertyId, ...inquiryData });
    
    return {
      success: true,
      message: 'Your inquiry has been sent to the agent.'
    };
  }
};

// Export all services
export default {
  agentService,
  authService,
  dashboardService,
  companyService
};
