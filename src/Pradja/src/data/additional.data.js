/**
 * Additional Data Models
 * Testimonials, Company Info, Dashboard Stats, and Users
 */

// ============================================================================
// TESTIMONIALS DATA
// ============================================================================

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Williams',
    role: 'Property Owner',
    company: 'Tech Startup Founder',
    content: 'Excellent service! Found my dream apartment in just 2 weeks. The team was professional and very helpful throughout the entire process. Highly recommended!',
    rating: 5,
    avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=SW',
    propertyType: 'Apartment',
    location: 'Jakarta',
    date: '2024-12-15',
    featured: true
  },
  {
    id: 2,
    name: 'Michael Zhang',
    role: 'Investor',
    company: 'Investment Manager',
    content: 'Great investment advice and market insights. Made a profitable property investment with their guidance. The team\'s expertise in the market is exceptional.',
    rating: 5,
    avatar: 'https://via.placeholder.com/100/c8a882/ffffff?text=MZ',
    propertyType: 'Commercial',
    location: 'Surabaya',
    date: '2024-11-20',
    featured: true
  },
  {
    id: 3,
    name: 'Linda Anderson',
    role: 'First-time Buyer',
    company: 'Marketing Manager',
    content: 'As a first-time buyer, I was nervous. But the agents made everything easy and clear. Very satisfied with my new home! Professional and patient throughout.',
    rating: 5,
    avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=LA',
    propertyType: 'House',
    location: 'Bandung',
    date: '2024-10-10',
    featured: true
  },
  {
    id: 4,
    name: 'David Kumar',
    role: 'Expatriate',
    company: 'Finance Director',
    content: 'Moving to Jakarta was made seamless thanks to this team. They understood my needs perfectly and found the ideal property for my family.',
    rating: 5,
    avatar: 'https://via.placeholder.com/100/c8a882/ffffff?text=DK',
    propertyType: 'Villa',
    location: 'Jakarta',
    date: '2024-09-05',
    featured: false
  },
  {
    id: 5,
    name: 'Amanda Lee',
    role: 'Property Owner',
    company: 'Entrepreneur',
    content: 'Professional service from start to finish. The virtual tours were excellent and saved me a lot of time. Very happy with the outcome.',
    rating: 4,
    avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=AL',
    propertyType: 'Apartment',
    location: 'Bali',
    date: '2024-08-18',
    featured: false
  },
  {
    id: 6,
    name: 'Robert Chen',
    role: 'Investor',
    company: 'Real Estate Developer',
    content: 'Outstanding market knowledge and negotiation skills. Helped me secure multiple investment properties at great prices.',
    rating: 5,
    avatar: 'https://via.placeholder.com/100/c8a882/ffffff?text=RC',
    propertyType: 'Land',
    location: 'Bali',
    date: '2024-07-22',
    featured: false
  }
];

// ============================================================================
// COMPANY INFO DATA
// ============================================================================

export const companyInfo = {
  name: 'PT Pradja Artha Sejahtera',
  tagline: 'Your Trusted Property Partner',
  description: 'PT Pradja Artha Sejahtera is a leading real estate company in Indonesia, specializing in residential, commercial, and investment properties. With over 15 years of experience, we have helped thousands of clients find their dream properties.',
  
  founded: '2010',
  experience: '15+ years',
  
  contact: {
    email: 'info@pradjaartha.com',
    phone: '+62 21 1234 5678',
    whatsapp: '+62 812 9999 8888',
    fax: '+62 21 1234 5679'
  },
  
  address: {
    street: 'Jl. Sudirman No. 123',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    zipCode: '10220',
    country: 'Indonesia',
    mapUrl: 'https://maps.google.com/?q=-6.2088,106.8456'
  },
  
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 9:00 AM - 2:00 PM',
    sunday: 'Sunday: Closed'
  },
  
  socialMedia: {
    facebook: 'https://facebook.com/pradjaartha',
    instagram: 'https://instagram.com/pradjaartha',
    twitter: 'https://twitter.com/pradjaartha',
    linkedin: 'https://linkedin.com/company/pradja-artha-sejahtera',
    youtube: 'https://youtube.com/@pradjaartha'
  },
  
  statistics: {
    propertiesListed: '2500+',
    happyClients: '1200+',
    expertAgents: '50+',
    yearsExperience: '15+',
    citiesCovered: '10+'
  },
  
  services: [
    {
      id: 1,
      title: 'Property Sales',
      description: 'Buy and sell properties with expert guidance',
      icon: 'home'
    },
    {
      id: 2,
      title: 'Property Rental',
      description: 'Find rental properties for short or long term',
      icon: 'key'
    },
    {
      id: 3,
      title: 'Investment Consulting',
      description: 'Strategic property investment advice',
      icon: 'trending-up'
    },
    {
      id: 4,
      title: 'Property Management',
      description: 'Professional property management services',
      icon: 'briefcase'
    },
    {
      id: 5,
      title: 'Market Analysis',
      description: 'Comprehensive market research and insights',
      icon: 'bar-chart'
    },
    {
      id: 6,
      title: 'Legal Support',
      description: 'Legal assistance for property transactions',
      icon: 'shield'
    }
  ],
  
  certifications: [
    'Licensed Real Estate Broker',
    'ISO 9001:2015 Certified',
    'Member of Indonesian Real Estate Association',
    'Certified Property Consultant Organization'
  ],
  
  awards: [
    {
      year: 2023,
      title: 'Best Real Estate Company',
      organization: 'Indonesia Property Awards'
    },
    {
      year: 2023,
      title: 'Excellence in Customer Service',
      organization: 'Asia Real Estate Excellence Awards'
    },
    {
      year: 2022,
      title: 'Top Property Portal',
      organization: 'Digital Real Estate Awards'
    }
  ]
};

// ============================================================================
// DASHBOARD DATA
// ============================================================================

export const dashboardData = {
  // Overview Statistics
  stats: {
    totalProperties: 156,
    totalAgents: 24,
    totalSales: 4520000000,
    totalInquiries: 89,
    trends: {
      properties: { change: '+12%', direction: 'up' },
      agents: { change: '+3', direction: 'up' },
      sales: { change: '+18%', direction: 'up' },
      inquiries: { change: '-5%', direction: 'down' }
    }
  },
  
  // Recent Properties
  recentProperties: [
    {
      id: 1,
      title: 'Modern Apartment in Central Jakarta',
      location: 'Jakarta Pusat',
      price: 2500000000,
      status: 'Published',
      views: 245,
      updatedAt: '2025-01-05T10:00:00Z'
    },
    {
      id: 2,
      title: 'Luxury Villa with Ocean View',
      location: 'Bali',
      price: 5000000000,
      status: 'Published',
      views: 178,
      updatedAt: '2025-01-05T09:30:00Z'
    },
    {
      id: 3,
      title: 'Contemporary House in BSD',
      location: 'Tangerang',
      price: 3200000000,
      status: 'Draft',
      views: 92,
      updatedAt: '2025-01-05T08:45:00Z'
    }
  ],
  
  // Sales Chart Data (Last 6 months)
  salesChart: {
    labels: ['Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025'],
    data: [3200000000, 3800000000, 4100000000, 3900000000, 4500000000, 4520000000]
  },
  
  // Property Types Distribution
  propertyTypes: {
    labels: ['Houses', 'Apartments', 'Villas', 'Land'],
    data: [45, 35, 15, 5]
  },
  
  // Top Performing Agents
  topAgents: [
    { id: 1, name: 'Sarah Johnson', sales: 45, revenue: 850000000 },
    { id: 2, name: 'Michael Chen', sales: 38, revenue: 720000000 },
    { id: 3, name: 'Linda Martinez', sales: 32, revenue: 640000000 },
    { id: 4, name: 'David Tan', sales: 28, revenue: 580000000 },
    { id: 5, name: 'Amanda Wong', sales: 25, revenue: 520000000 }
  ],
  
  // Recent Activities
  recentActivities: [
    {
      id: 1,
      type: 'property_added',
      user: 'Sarah Johnson',
      description: 'added a new property',
      property: 'Modern Apartment in Central Jakarta',
      timestamp: '2025-01-05T15:30:00Z'
    },
    {
      id: 2,
      type: 'property_sold',
      user: 'Michael Chen',
      description: 'sold a property',
      property: 'Luxury Villa in Seminyak',
      timestamp: '2025-01-05T14:20:00Z'
    },
    {
      id: 3,
      type: 'inquiry_received',
      user: 'System',
      description: 'received inquiry for',
      property: 'House in BSD City',
      timestamp: '2025-01-05T13:15:00Z'
    },
    {
      id: 4,
      type: 'agent_joined',
      user: 'Linda Martinez',
      description: 'joined the team',
      property: null,
      timestamp: '2025-01-05T10:00:00Z'
    }
  ],
  
  // Monthly Goals
  monthlyGoals: {
    salesTarget: 5000000000,
    currentSales: 4520000000,
    percentage: 90.4,
    listingsTarget: 20,
    currentListings: 18,
    clientsTarget: 50,
    currentClients: 47
  }
};

// ============================================================================
// USERS DATA (Admin/Agents)
// ============================================================================

export const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@pradjaartha.com',
    password: 'admin123', // In production, this would be hashed
    role: 'admin',
    avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=ADM',
    phone: '+62 812 0000 0001',
    status: 'active',
    createdAt: '2020-01-01T00:00:00Z',
    lastLogin: '2025-01-05T08:00:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@pradjaartha.com',
    password: 'sarah123',
    role: 'agent',
    avatar: 'https://via.placeholder.com/100/c8a882/ffffff?text=SJ',
    phone: '+62 812 3456 7890',
    status: 'active',
    createdAt: '2015-03-15T00:00:00Z',
    lastLogin: '2025-01-05T09:30:00Z'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@pradjaartha.com',
    password: 'michael123',
    role: 'agent',
    avatar: 'https://via.placeholder.com/100/1a4d2e/ffffff?text=MC',
    phone: '+62 813 9876 5432',
    status: 'active',
    createdAt: '2017-06-20T00:00:00Z',
    lastLogin: '2025-01-05T07:45:00Z'
  }
];

// Export all
export default {
  testimonials,
  companyInfo,
  dashboardData,
  users
};
