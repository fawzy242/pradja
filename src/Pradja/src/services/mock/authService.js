/**
 * Mock Authentication Service
 * Simulates API calls for authentication
 */

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: 'admin@pradjaartha.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Admin User',
    role: 'admin',
    avatar: '/assets/images/avatars/admin.jpg',
    phone: '+62 812 3456 7890',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    email: 'manager@pradjaartha.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    avatar: '/assets/images/avatars/manager.jpg',
    phone: '+62 813 4567 8901',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Simulate API delay
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Token management
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Authentication Service
 * All auth-related operations
 */
export const authService = {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    await delay();
    
    // Find user
    const user = mockUsers.find(u => u.email === email);
    
    // Check credentials
    if (!user || user.password !== password) {
      return {
        success: false,
        data: null,
        message: 'Invalid email or password',
      };
    }

    // Generate mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      data: {
        token,
        user: userWithoutPassword,
      },
      message: 'Login successful',
    };
  },

  /**
   * Logout user
   * @returns {Promise<Object>}
   */
  async logout() {
    await delay(300);
    
    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return {
      success: true,
      data: null,
      message: 'Logout successful',
    };
  },

  /**
   * Get current user
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  /**
   * Get current token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  },

  /**
   * Register new user
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async register(userData) {
    await delay();
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      return {
        success: false,
        data: null,
        message: 'Email already registered',
      };
    }

    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return {
        success: false,
        data: null,
        message: 'Please provide all required fields',
      };
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user',
      avatar: '/assets/images/avatars/default.jpg',
      createdAt: new Date().toISOString(),
    };

    // In real app, this would save to database
    // mockUsers.push(newUser);

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      data: userWithoutPassword,
      message: 'Registration successful',
    };
  },

  /**
   * Update user profile
   * @param {Object} updates
   * @returns {Promise<Object>}
   */
  async updateProfile(updates) {
    await delay();
    
    const currentUser = this.getCurrentUser();
    
    if (!currentUser) {
      return {
        success: false,
        data: null,
        message: 'User not authenticated',
      };
    }

    // Update user data
    const updatedUser = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Update localStorage
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    return {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully',
    };
  },

  /**
   * Change password
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<Object>}
   */
  async changePassword(currentPassword, newPassword) {
    await delay();
    
    const currentUser = this.getCurrentUser();
    
    if (!currentUser) {
      return {
        success: false,
        data: null,
        message: 'User not authenticated',
      };
    }

    // Find full user with password
    const user = mockUsers.find(u => u.id === currentUser.id);
    
    if (!user || user.password !== currentPassword) {
      return {
        success: false,
        data: null,
        message: 'Current password is incorrect',
      };
    }

    // In real app, this would update password in database
    // user.password = newPassword;

    return {
      success: true,
      data: null,
      message: 'Password changed successfully',
    };
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise<Object>}
   */
  async requestPasswordReset(email) {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      // For security, don't reveal if email exists
      return {
        success: true,
        data: null,
        message: 'If the email exists, a reset link has been sent',
      };
    }

    // In real app, this would send reset email
    return {
      success: true,
      data: null,
      message: 'Password reset link sent to your email',
    };
  },

  /**
   * Reset password with token
   * @param {string} token
   * @param {string} newPassword
   * @returns {Promise<Object>}
   */
  async resetPassword(token, newPassword) {
    await delay();
    
    // In real app, this would verify token and update password
    // For mock, just return success
    return {
      success: true,
      data: null,
      message: 'Password reset successfully',
    };
  },

  /**
   * Verify email
   * @param {string} token
   * @returns {Promise<Object>}
   */
  async verifyEmail(token) {
    await delay();
    
    // In real app, this would verify token and mark email as verified
    return {
      success: true,
      data: null,
      message: 'Email verified successfully',
    };
  },

  /**
   * Refresh authentication token
   * @returns {Promise<Object>}
   */
  async refreshToken() {
    await delay(300);
    
    const currentUser = this.getCurrentUser();
    
    if (!currentUser) {
      return {
        success: false,
        data: null,
        message: 'User not authenticated',
      };
    }

    // Generate new token
    const newToken = `mock-jwt-token-${currentUser.id}-${Date.now()}`;
    localStorage.setItem(TOKEN_KEY, newToken);

    return {
      success: true,
      data: { token: newToken },
      message: 'Token refreshed successfully',
    };
  },

  /**
   * Verify authentication token
   * @param {string} token
   * @returns {Promise<Object>}
   */
  async verifyToken(token) {
    await delay(200);
    
    // In real app, this would verify JWT token with backend
    // For mock, check if token exists and is valid format
    if (!token || !token.startsWith('mock-jwt-token-')) {
      return {
        success: false,
        data: null,
        message: 'Invalid token',
      };
    }

    // Extract user ID from token
    const parts = token.split('-');
    const userId = parseInt(parts[3], 10);
    
    // Find user
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return {
        success: false,
        data: null,
        message: 'User not found',
      };
    }

    // Remove password
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: userWithoutPassword,
      message: 'Token verified',
    };
  },
};

export default authService;
