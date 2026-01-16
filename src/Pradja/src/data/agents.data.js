/**
 * Agents Data Model
 * Hardcoded agent profiles for mock API
 * 
 * Total Agents: 20+
 * Specializations: Residential, Commercial, Luxury, Investment
 * Languages: English, Indonesian, Chinese, Japanese
 */

export const agents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    slug: 'sarah-johnson',
    title: 'Senior Property Consultant',
    specialization: 'Luxury Residential',
    bio: 'With over 10 years of experience in luxury real estate, Sarah has helped hundreds of clients find their dream homes in Jakarta and Bali. She specializes in high-end residential properties and investment opportunities.',
    email: 'sarah.johnson@pradjaartha.com',
    phone: '+62 812 3456 7890',
    whatsapp: '+62 812 3456 7890',
    avatar: 'https://via.placeholder.com/200x200/1a4d2e/ffffff?text=SJ',
    coverImage: 'https://via.placeholder.com/1200x400/c8a882/ffffff?text=Sarah+Johnson',
    languages: ['English', 'Indonesian'],
    experience: '10+ years',
    propertiesSold: 245,
    activeListings: 12,
    rating: 4.9,
    reviews: 87,
    certifications: [
      'Licensed Real Estate Agent',
      'Certified Luxury Home Marketing Specialist',
      'International Property Specialist'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      instagram: 'https://instagram.com/sarahjohnson.property',
      facebook: 'https://facebook.com/sarahjohnson.realtor'
    },
    achievements: [
      'Top Agent 2023',
      'Best Customer Service 2022',
      'Million Dollar Club Member'
    ],
    areas: ['Jakarta Selatan', 'Pondok Indah', 'Kemang', 'Canggu'],
    featured: true,
    active: true,
    joinedDate: '2015-03-15',
    updatedAt: '2025-01-05T10:00:00Z'
  },

  {
    id: 2,
    name: 'Michael Chen',
    slug: 'michael-chen',
    title: 'Investment Property Specialist',
    specialization: 'Commercial & Investment',
    bio: 'Michael brings extensive knowledge in commercial real estate and investment properties. He has successfully facilitated numerous high-value transactions and provides strategic investment advice to clients.',
    email: 'michael.chen@pradjaartha.com',
    phone: '+62 813 9876 5432',
    whatsapp: '+62 813 9876 5432',
    avatar: 'https://via.placeholder.com/200x200/c8a882/ffffff?text=MC',
    coverImage: 'https://via.placeholder.com/1200x400/1a4d2e/ffffff?text=Michael+Chen',
    languages: ['English', 'Indonesian', 'Mandarin'],
    experience: '8 years',
    propertiesSold: 178,
    activeListings: 15,
    rating: 4.8,
    reviews: 64,
    certifications: [
      'Licensed Real Estate Agent',
      'Commercial Real Estate Specialist',
      'Investment Property Advisor'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      instagram: 'https://instagram.com/michaelchen.property'
    },
    achievements: [
      'Top Commercial Agent 2023',
      'Excellence in Investment Advisory 2022'
    ],
    areas: ['Jakarta Pusat', 'Sudirman', 'SCBD', 'Kuningan'],
    featured: true,
    active: true,
    joinedDate: '2017-06-20',
    updatedAt: '2025-01-05T11:30:00Z'
  },

  {
    id: 3,
    name: 'Linda Martinez',
    slug: 'linda-martinez',
    title: 'Residential Property Consultant',
    specialization: 'Family Homes & Villas',
    bio: 'Linda specializes in helping families find their perfect home. With a warm and personable approach, she understands the unique needs of each family and works tirelessly to match them with ideal properties.',
    email: 'linda.martinez@pradjaartha.com',
    phone: '+62 821 5555 4444',
    whatsapp: '+62 821 5555 4444',
    avatar: 'https://via.placeholder.com/200x200/1a4d2e/ffffff?text=LM',
    coverImage: 'https://via.placeholder.com/1200x400/c8a882/ffffff?text=Linda+Martinez',
    languages: ['English', 'Indonesian', 'Spanish'],
    experience: '6 years',
    propertiesSold: 134,
    activeListings: 10,
    rating: 4.9,
    reviews: 52,
    certifications: [
      'Licensed Real Estate Agent',
      'Family Home Specialist',
      'Relocation Consultant'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/lindamartinez',
      instagram: 'https://instagram.com/linda.property',
      facebook: 'https://facebook.com/linda.realtor'
    },
    achievements: [
      'Best First-Time Buyer Agent 2023',
      'Customer Choice Award 2022'
    ],
    areas: ['BSD City', 'Alam Sutera', 'Bintaro', 'Serpong'],
    featured: true,
    active: true,
    joinedDate: '2019-01-10',
    updatedAt: '2025-01-05T09:45:00Z'
  },

  {
    id: 4,
    name: 'David Tan',
    slug: 'david-tan',
    title: 'Luxury Property Consultant',
    specialization: 'High-End Residential',
    bio: 'David focuses on luxury properties and high-net-worth clients. His attention to detail and discretion makes him the go-to agent for exclusive listings.',
    email: 'david.tan@pradjaartha.com',
    phone: '+62 815 7777 8888',
    whatsapp: '+62 815 7777 8888',
    avatar: 'https://via.placeholder.com/200x200/c8a882/ffffff?text=DT',
    coverImage: 'https://via.placeholder.com/1200x400/1a4d2e/ffffff?text=David+Tan',
    languages: ['English', 'Indonesian', 'Mandarin'],
    experience: '12 years',
    propertiesSold: 198,
    activeListings: 8,
    rating: 5.0,
    reviews: 45,
    certifications: [
      'Licensed Real Estate Agent',
      'Luxury Property Specialist',
      'Global Property Consultant'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/davidtan',
      instagram: 'https://instagram.com/davidtan.luxury'
    },
    achievements: [
      'Luxury Agent of the Year 2023',
      'Platinum Club Member'
    ],
    areas: ['Menteng', 'Senopati', 'Pantai Indah Kapuk', 'Kemang'],
    featured: true,
    active: true,
    joinedDate: '2013-08-05',
    updatedAt: '2025-01-05T14:20:00Z'
  },

  {
    id: 5,
    name: 'Amanda Wong',
    slug: 'amanda-wong',
    title: 'Property Investment Advisor',
    specialization: 'Investment Properties',
    bio: 'Amanda helps clients build their property investment portfolios with strategic advice and market insights.',
    email: 'amanda.wong@pradjaartha.com',
    phone: '+62 822 3333 2222',
    whatsapp: '+62 822 3333 2222',
    avatar: 'https://via.placeholder.com/200x200/1a4d2e/ffffff?text=AW',
    coverImage: 'https://via.placeholder.com/1200x400/c8a882/ffffff?text=Amanda+Wong',
    languages: ['English', 'Indonesian', 'Mandarin', 'Cantonese'],
    experience: '7 years',
    propertiesSold: 156,
    activeListings: 14,
    rating: 4.7,
    reviews: 38,
    certifications: [
      'Licensed Real Estate Agent',
      'Investment Property Specialist',
      'Market Analysis Expert'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/amandawong',
      instagram: 'https://instagram.com/amanda.investment'
    },
    achievements: [
      'Investment Advisor Excellence 2023'
    ],
    areas: ['Jakarta', 'Tangerang', 'Bekasi', 'Depok'],
    featured: false,
    active: true,
    joinedDate: '2018-03-12',
    updatedAt: '2025-01-04T16:00:00Z'
  },

  // Additional agents (6-20)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    name: `Agent ${i + 6}`,
    slug: `agent-${i + 6}`,
    title: ['Property Consultant', 'Senior Agent', 'Real Estate Specialist'][i % 3],
    specialization: ['Residential', 'Commercial', 'Luxury', 'Investment'][i % 4],
    bio: `Experienced agent with ${5 + (i % 8)} years in real estate. Committed to providing excellent service and finding the perfect property for clients.`,
    email: `agent${i + 6}@pradjaartha.com`,
    phone: `+62 81${i % 10} ${1111 + i} ${2222 + i}`,
    whatsapp: `+62 81${i % 10} ${1111 + i} ${2222 + i}`,
    avatar: `https://via.placeholder.com/200x200/${i % 2 === 0 ? '1a4d2e' : 'c8a882'}/ffffff?text=A${i + 6}`,
    coverImage: `https://via.placeholder.com/1200x400/${i % 2 === 0 ? 'c8a882' : '1a4d2e'}/ffffff?text=Agent+${i + 6}`,
    languages: ['English', 'Indonesian'],
    experience: `${5 + (i % 8)} years`,
    propertiesSold: 50 + (i * 10),
    activeListings: 5 + (i % 10),
    rating: 4.5 + ((i % 5) * 0.1),
    reviews: 20 + (i % 30),
    certifications: [
      'Licensed Real Estate Agent'
    ],
    socialMedia: {
      linkedin: `https://linkedin.com/in/agent${i + 6}`,
      instagram: `https://instagram.com/agent${i + 6}.property`
    },
    achievements: [],
    areas: [['Jakarta', 'Bandung', 'Surabaya', 'Bali'][i % 4]],
    featured: false,
    active: true,
    joinedDate: `201${5 + (i % 5)}-0${(i % 9) + 1}-15`,
    updatedAt: `2025-01-0${(i % 5) + 1}T10:00:00Z`
  }))
];

// Agent statistics
export const agentStats = {
  total: agents.length,
  active: agents.filter(a => a.active).length,
  featured: agents.filter(a => a.featured).length,
  totalSold: agents.reduce((sum, a) => sum + a.propertiesSold, 0),
  totalListings: agents.reduce((sum, a) => sum + a.activeListings, 0),
  avgRating: (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(2),
  bySpecialization: agents.reduce((acc, a) => {
    acc[a.specialization] = (acc[a.specialization] || 0) + 1;
    return acc;
  }, {})
};

export default agents;
