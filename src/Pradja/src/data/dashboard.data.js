/**
 * Dashboard Data
 * Mock dashboard statistics and data
 */

export const dashboardStats = {
  totalProperties: 150,
  activeListings: 120,
  soldThisMonth: 25,
  totalRevenue: 15000000000,
  newInquiries: 45,
  scheduledViewings: 30,
};

export const recentActivities = [
  {
    id: 1,
    type: 'property_added',
    title: 'New Property Listed',
    description: 'Modern Villa in Bali',
    timestamp: new Date(2024, 0, 10, 14, 30),
    icon: 'home',
  },
  {
    id: 2,
    type: 'inquiry_received',
    title: 'New Inquiry',
    description: 'Apartment in Jakarta from John Doe',
    timestamp: new Date(2024, 0, 10, 12, 15),
    icon: 'mail',
  },
  {
    id: 3,
    type: 'property_sold',
    title: 'Property Sold',
    description: 'Luxury House in Surabaya',
    timestamp: new Date(2024, 0, 9, 16, 45),
    icon: 'check-circle',
  },
];

export default {
  dashboardStats,
  recentActivities,
};
