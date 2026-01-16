/**
 * Mock Agent Service
 * Simulates API calls for agent management
 */

import { agents } from '../../data/agents.data';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Agent Service
 * All agent-related API operations
 */
export const agentService = {
  /**
   * Get all agents
   * @returns {Promise<Array>}
   */
  async getAllAgents() {
    await delay();
    return {
      success: true,
      data: agents.filter(agent => agent.active),
      message: 'Agents retrieved successfully',
    };
  },

  /**
   * Get agent by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getAgentById(id) {
    await delay();
    const agent = agents.find(a => a.id === parseInt(id));
    
    if (!agent) {
      return {
        success: false,
        data: null,
        message: 'Agent not found',
      };
    }

    return {
      success: true,
      data: agent,
      message: 'Agent retrieved successfully',
    };
  },

  /**
   * Get featured agents
   * @param {number} limit
   * @returns {Promise<Array>}
   */
  async getFeaturedAgents(limit = 4) {
    await delay();
    const featured = agents
      .filter(agent => agent.featured && agent.active)
      .slice(0, limit);

    return {
      success: true,
      data: featured,
      message: 'Featured agents retrieved successfully',
    };
  },

  /**
   * Search agents
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchAgents(query) {
    await delay();
    const lowercaseQuery = query.toLowerCase();
    const results = agents.filter(agent => 
      agent.active && (
        agent.name.toLowerCase().includes(lowercaseQuery) ||
        agent.specialization.toLowerCase().includes(lowercaseQuery) ||
        agent.location.toLowerCase().includes(lowercaseQuery)
      )
    );

    return {
      success: true,
      data: results,
      message: `Found ${results.length} agents`,
    };
  },

  /**
   * Get agents by specialization
   * @param {string} specialization
   * @returns {Promise<Array>}
   */
  async getAgentsBySpecialization(specialization) {
    await delay();
    const filtered = agents.filter(
      agent => agent.active && agent.specialization === specialization
    );

    return {
      success: true,
      data: filtered,
      message: 'Agents retrieved successfully',
    };
  },

  /**
   * Create new agent (admin)
   * @param {Object} agentData
   * @returns {Promise<Object>}
   */
  async createAgent(agentData) {
    await delay();
    
    // Simulate validation
    if (!agentData.name || !agentData.email || !agentData.phone) {
      return {
        success: false,
        data: null,
        message: 'Please provide all required fields',
      };
    }

    const newAgent = {
      id: agents.length + 1,
      ...agentData,
      active: true,
      rating: 5.0,
      reviews: 0,
      propertiesListed: 0,
      propertiesSold: 0,
      joinedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In real app, this would push to database
    // agents.push(newAgent);

    return {
      success: true,
      data: newAgent,
      message: 'Agent created successfully',
    };
  },

  /**
   * Update agent (admin)
   * @param {number} id
   * @param {Object} updates
   * @returns {Promise<Object>}
   */
  async updateAgent(id, updates) {
    await delay();
    
    const agentIndex = agents.findIndex(a => a.id === parseInt(id));
    
    if (agentIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Agent not found',
      };
    }

    const updatedAgent = {
      ...agents[agentIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // In real app, this would update database
    // agents[agentIndex] = updatedAgent;

    return {
      success: true,
      data: updatedAgent,
      message: 'Agent updated successfully',
    };
  },

  /**
   * Delete agent (admin)
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async deleteAgent(id) {
    await delay();
    
    const agent = agents.find(a => a.id === parseInt(id));
    
    if (!agent) {
      return {
        success: false,
        data: null,
        message: 'Agent not found',
      };
    }

    // In real app, this would soft delete or remove from database
    // Soft delete approach:
    // agents[agentIndex].active = false;
    // Hard delete approach:
    // agents.splice(agentIndex, 1);

    return {
      success: true,
      data: { id },
      message: 'Agent deleted successfully',
    };
  },

  /**
   * Get agent statistics
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getAgentStats(id) {
    await delay();
    
    const agent = agents.find(a => a.id === parseInt(id));
    
    if (!agent) {
      return {
        success: false,
        data: null,
        message: 'Agent not found',
      };
    }

    const stats = {
      totalListings: agent.propertiesListed,
      activeListing: agent.propertiesListed - agent.propertiesSold,
      totalSales: agent.propertiesSold,
      averageRating: agent.rating,
      totalReviews: agent.reviews,
      responseRate: agent.responseRate,
      responseTime: agent.responseTime,
    };

    return {
      success: true,
      data: stats,
      message: 'Agent statistics retrieved successfully',
    };
  },

  /**
   * Contact agent
   * @param {number} agentId
   * @param {Object} contactData
   * @returns {Promise<Object>}
   */
  async contactAgent(agentId, contactData) {
    await delay();
    
    const agent = agents.find(a => a.id === parseInt(agentId));
    
    if (!agent) {
      return {
        success: false,
        data: null,
        message: 'Agent not found',
      };
    }

    // In real app, this would send email/notification
    return {
      success: true,
      data: {
        agentId,
        contactData,
        sentAt: new Date().toISOString(),
      },
      message: 'Message sent to agent successfully',
    };
  },
};

export default agentService;
