/**
 * Mock Dashboard Service
 * Simulates API calls for dashboard statistics and analytics
 */

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock dashboard data
const generateMockStats = () => ({
  properties: {
    total: 156,
    active: 142,
    sold: 14,
    forSale: 95,
    forRent: 47,
    trend: {
      value: 12,
      direction: 'up',
      percentage: 8.5,
    },
  },
  agents: {
    total: 24,
    active: 22,
    inactive: 2,
    newThisMonth: 3,
    trend: {
      value: 3,
      direction: 'up',
      percentage: 14.3,
    },
  },
  sales: {
    total: 45200000000, // Rp 45.2 Billion
    thisMonth: 8500000000, // Rp 8.5 Billion
    lastMonth: 7200000000, // Rp 7.2 Billion
    trend: {
      value: 8100000000,
      direction: 'up',
      percentage: 18.1,
    },
  },
  inquiries: {
    total: 89,
    pending: 45,
    responded: 32,
    closed: 12,
    trend: {
      value: -5,
      direction: 'down',
      percentage: 5.3,
    },
  },
  views: {
    total: 125000,
    thisWeek: 8500,
    lastWeek: 7800,
    trend: {
      value: 700,
      direction: 'up',
      percentage: 9.0,
    },
  },
});

// Generate monthly sales data
const generateMonthlySales = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    sales: Math.floor(Math.random() * 10000000000) + 3000000000, // 3-13 Billion
    properties: Math.floor(Math.random() * 15) + 5, // 5-20 properties
  }));
};

// Generate property type distribution
const generatePropertyTypeDistribution = () => ([
  { type: 'Apartment', count: 65, percentage: 41.7 },
  { type: 'House', count: 52, percentage: 33.3 },
  { type: 'Villa', count: 23, percentage: 14.7 },
  { type: 'Office', count: 12, percentage: 7.7 },
  { type: 'Land', count: 4, percentage: 2.6 },
]);

// Generate recent activities
const generateRecentActivities = () => ([
  {
    id: 1,
    type: 'property_sold',
    message: 'Property #1234 sold for Rp 2.5 Billion',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    agent: 'Sarah Johnson',
  },
  {
    id: 2,
    type: 'new_inquiry',
    message: 'New inquiry for Modern Apartment Central Jakarta',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    customer: 'John Doe',
  },
  {
    id: 3,
    type: 'property_listed',
    message: 'New property listed: Luxury Villa Bali',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    agent: 'Michael Chen',
  },
  {
    id: 4,
    type: 'agent_joined',
    message: 'New agent joined: Amanda Rodriguez',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    agent: 'Amanda Rodriguez',
  },
  {
    id: 5,
    type: 'inquiry_closed',
    message: 'Inquiry #5678 marked as closed',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    agent: 'David Martinez',
  },
]);

/**
 * Dashboard Service
 * All dashboard-related API operations
 */
export const dashboardService = {
  /**
   * Get overview statistics
   * @returns {Promise<Object>}
   */
  async getOverviewStats() {
    await delay();
    
    const stats = generateMockStats();

    return {
      success: true,
      data: stats,
      message: 'Dashboard stats retrieved successfully',
    };
  },

  /**
   * Get monthly sales chart data
   * @param {number} year
   * @returns {Promise<Array>}
   */
  async getMonthlySales(year = 2025) {
    await delay();
    
    const data = generateMonthlySales();

    return {
      success: true,
      data,
      message: 'Monthly sales data retrieved successfully',
    };
  },

  /**
   * Get property type distribution
   * @returns {Promise<Array>}
   */
  async getPropertyTypeDistribution() {
    await delay();
    
    const data = generatePropertyTypeDistribution();

    return {
      success: true,
      data,
      message: 'Property distribution retrieved successfully',
    };
  },

  /**
   * Get recent activities
   * @param {number} limit
   * @returns {Promise<Array>}
   */
  async getRecentActivities(limit = 10) {
    await delay();
    
    const activities = generateRecentActivities().slice(0, limit);

    return {
      success: true,
      data: activities,
      message: 'Recent activities retrieved successfully',
    };
  },

  /**
   * Get top performing agents
   * @param {number} limit
   * @returns {Promise<Array>}
   */
  async getTopAgents(limit = 5) {
    await delay();
    
    const agents = [
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: '/assets/images/agents/agent-1.jpg',
        salesThisMonth: 5,
        revenueThisMonth: 12500000000,
        rating: 4.9,
      },
      {
        id: 2,
        name: 'Michael Chen',
        avatar: '/assets/images/agents/agent-2.jpg',
        salesThisMonth: 4,
        revenueThisMonth: 9800000000,
        rating: 4.8,
      },
      {
        id: 3,
        name: 'Amanda Rodriguez',
        avatar: '/assets/images/agents/agent-3.jpg',
        salesThisMonth: 3,
        revenueThisMonth: 8200000000,
        rating: 4.9,
      },
      {
        id: 4,
        name: 'David Martinez',
        avatar: '/assets/images/agents/agent-4.jpg',
        salesThisMonth: 3,
        revenueThisMonth: 7500000000,
        rating: 4.7,
      },
      {
        id: 5,
        name: 'Emily Wong',
        avatar: '/assets/images/agents/agent-5.jpg',
        salesThisMonth: 2,
        revenueThisMonth: 5900000000,
        rating: 4.8,
      },
    ].slice(0, limit);

    return {
      success: true,
      data: agents,
      message: 'Top agents retrieved successfully',
    };
  },

  /**
   * Get inquiry statistics
   * @returns {Promise<Object>}
   */
  async getInquiryStats() {
    await delay();
    
    const stats = {
      byStatus: [
        { status: 'Pending', count: 45, percentage: 50.6 },
        { status: 'Responded', count: 32, percentage: 36.0 },
        { status: 'Closed', count: 12, percentage: 13.4 },
      ],
      bySource: [
        { source: 'Website', count: 52, percentage: 58.4 },
        { source: 'WhatsApp', count: 25, percentage: 28.1 },
        { source: 'Phone', count: 12, percentage: 13.5 },
      ],
      averageResponseTime: '2.5 hours',
      responseRate: 89,
    };

    return {
      success: true,
      data: stats,
      message: 'Inquiry stats retrieved successfully',
    };
  },

  /**
   * Get revenue comparison
   * @param {string} period - 'week', 'month', 'quarter', 'year'
   * @returns {Promise<Object>}
   */
  async getRevenueComparison(period = 'month') {
    await delay();
    
    const data = {
      current: 8500000000,
      previous: 7200000000,
      change: 1300000000,
      changePercentage: 18.1,
      trend: 'up',
      period,
    };

    return {
      success: true,
      data,
      message: 'Revenue comparison retrieved successfully',
    };
  },

  /**
   * Get location-based statistics
   * @returns {Promise<Array>}
   */
  async getLocationStats() {
    await delay();
    
    const locations = [
      { city: 'Jakarta Pusat', count: 45, sales: 15200000000 },
      { city: 'Jakarta Selatan', count: 38, sales: 12800000000 },
      { city: 'Tangerang Selatan', count: 32, sales: 9600000000 },
      { city: 'Bali', count: 23, sales: 18500000000 },
      { city: 'Bandung', count: 18, sales: 6200000000 },
    ];

    return {
      success: true,
      data: locations,
      message: 'Location stats retrieved successfully',
    };
  },
};

export default dashboardService;
