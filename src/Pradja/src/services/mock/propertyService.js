/**
 * Property Service (Mock)
 * Mock API service for property operations
 * Simulates async operations with delays
 */

import { properties as initialProperties, propertyStats } from '../../data';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory data store (simulates database)
let propertiesStore = [...initialProperties];

/**
 * Get all properties with optional filtering and pagination
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Properties data with pagination
 */
export const getAllProperties = async (params = {}) => {
  await delay();
  
  const {
    page = 1,
    limit = 10,
    search = '',
    type = 'all',
    status = 'all',
    priceMin,
    priceMax,
    bedrooms,
    bathrooms,
    city,
    sortBy = 'newest',
    featured
  } = params;
  
  let filtered = [...propertiesStore];
  
  // Filter by search query
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.location.city.toLowerCase().includes(query) ||
      p.location.address.toLowerCase().includes(query)
    );
  }
  
  // Filter by type
  if (type && type !== 'all') {
    filtered = filtered.filter(p => p.type === type);
  }
  
  // Filter by status
  if (status && status !== 'all') {
    filtered = filtered.filter(p => p.status === status);
  }
  
  // Filter by price range
  if (priceMin) {
    filtered = filtered.filter(p => p.price >= Number(priceMin));
  }
  if (priceMax) {
    filtered = filtered.filter(p => p.price <= Number(priceMax));
  }
  
  // Filter by bedrooms
  if (bedrooms && bedrooms !== 'any') {
    filtered = filtered.filter(p => p.specs.bedrooms >= Number(bedrooms));
  }
  
  // Filter by bathrooms
  if (bathrooms && bathrooms !== 'any') {
    filtered = filtered.filter(p => p.specs.bathrooms >= Number(bathrooms));
  }
  
  // Filter by city
  if (city && city !== 'all') {
    filtered = filtered.filter(p => p.location.city === city);
  }
  
  // Filter by featured
  if (featured !== undefined) {
    filtered = filtered.filter(p => p.featured === Boolean(featured));
  }
  
  // Filter by published
  filtered = filtered.filter(p => p.published === true);
  
  // Sort
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      filtered.sort((a, b) => b.views - a.views);
      break;
    default:
      break;
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
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

/**
 * Get property by ID
 * @param {number|string} id - Property ID
 * @returns {Promise<Object>} Property data
 */
export const getPropertyById = async (id) => {
  await delay(300);
  
  const property = propertiesStore.find(p => p.id === Number(id));
  
  if (!property) {
    throw new Error('Property not found');
  }
  
  // Increment views
  property.views += 1;
  
  return property;
};

/**
 * Get featured properties
 * @param {number} limit - Number of properties to return
 * @returns {Promise<Array>} Featured properties
 */
export const getFeaturedProperties = async (limit = 6) => {
  await delay(300);
  
  return propertiesStore
    .filter(p => p.featured && p.published)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

/**
 * Get similar properties
 * @param {number} propertyId - Property ID
 * @param {number} limit - Number of properties to return
 * @returns {Promise<Array>} Similar properties
 */
export const getSimilarProperties = async (propertyId, limit = 3) => {
  await delay(300);
  
  const property = propertiesStore.find(p => p.id === Number(propertyId));
  
  if (!property) {
    return [];
  }
  
  return propertiesStore
    .filter(p => 
      p.id !== property.id &&
      p.type === property.type &&
      p.published &&
      Math.abs(p.price - property.price) <= property.price * 0.3 // Within 30% price range
    )
    .slice(0, limit);
};

/**
 * Get property statistics
 * @returns {Promise<Object>} Property statistics
 */
export const getPropertyStatistics = async () => {
  await delay(200);
  return propertyStats;
};

/**
 * Create new property (Admin)
 * @param {Object} propertyData - Property data
 * @returns {Promise<Object>} Created property
 */
export const createProperty = async (propertyData) => {
  await delay(800);
  
  const newProperty = {
    id: Math.max(...propertiesStore.map(p => p.id)) + 1,
    ...propertyData,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: false
  };
  
  propertiesStore.push(newProperty);
  
  return newProperty;
};

/**
 * Update property (Admin)
 * @param {number} id - Property ID
 * @param {Object} updates - Property updates
 * @returns {Promise<Object>} Updated property
 */
export const updateProperty = async (id, updates) => {
  await delay(800);
  
  const index = propertiesStore.findIndex(p => p.id === Number(id));
  
  if (index === -1) {
    throw new Error('Property not found');
  }
  
  propertiesStore[index] = {
    ...propertiesStore[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return propertiesStore[index];
};

/**
 * Delete property (Admin)
 * @param {number} id - Property ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteProperty = async (id) => {
  await delay(500);
  
  const index = propertiesStore.findIndex(p => p.id === Number(id));
  
  if (index === -1) {
    throw new Error('Property not found');
  }
  
  propertiesStore.splice(index, 1);
  
  return true;
};

/**
 * Toggle property featured status (Admin)
 * @param {number} id - Property ID
 * @returns {Promise<Object>} Updated property
 */
export const togglePropertyFeatured = async (id) => {
  await delay(300);
  
  const property = propertiesStore.find(p => p.id === Number(id));
  
  if (!property) {
    throw new Error('Property not found');
  }
  
  property.featured = !property.featured;
  property.updatedAt = new Date().toISOString();
  
  return property;
};

/**
 * Toggle property published status (Admin)
 * @param {number} id - Property ID
 * @returns {Promise<Object>} Updated property
 */
export const togglePropertyPublished = async (id) => {
  await delay(300);
  
  const property = propertiesStore.find(p => p.id === Number(id));
  
  if (!property) {
    throw new Error('Property not found');
  }
  
  property.published = !property.published;
  property.updatedAt = new Date().toISOString();
  
  return property;
};

/**
 * Like/Unlike property
 * @param {number} id - Property ID
 * @returns {Promise<Object>} Updated property
 */
export const togglePropertyLike = async (id) => {
  await delay(200);
  
  const property = propertiesStore.find(p => p.id === Number(id));
  
  if (!property) {
    throw new Error('Property not found');
  }
  
  // In real app, this would check if user already liked
  property.likes += 1;
  
  return property;
};

export default {
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
  togglePropertyLike
};
