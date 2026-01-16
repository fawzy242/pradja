/**
 * Properties Data Model
 * Hardcoded property listings for mock API
 * 
 * Total Properties: 50+
 * Property Types: House, Apartment, Villa, Land
 * Locations: Jakarta, Bali, Bandung, Surabaya, etc.
 */

export const properties = [
  // Jakarta Properties
  {
    id: 1,
    title: 'Modern Apartment in Central Jakarta',
    slug: 'modern-apartment-central-jakarta',
    description: 'Luxurious 3-bedroom apartment with panoramic city views in the heart of Jakarta business district. Features contemporary finishes, high ceilings, and premium amenities.',
    type: 'Apartment',
    status: 'For Sale',
    price: 2500000000,
    location: {
      address: 'Jl. Sudirman Kav. 52-53',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      country: 'Indonesia',
      zipCode: '10220',
      coordinates: { lat: -6.2088, lng: 106.8456 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      landArea: null,
      carSpaces: 2,
      floors: 1,
      yearBuilt: 2022,
      furnishing: 'Fully Furnished'
    },
    features: [
      'Air Conditioning',
      'Balcony',
      'Built-in Wardrobes',
      'City Views',
      'Dishwasher',
      'Gym Access',
      'High-Speed Internet',
      'Laundry Room',
      'Modern Kitchen',
      'Pool Access',
      'Security 24/7',
      'Storage Room'
    ],
    images: [
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Property+1+-+Main',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Property+1+-+Living',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Property+1+-+Kitchen',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Property+1+-+Bedroom'
    ],
    agent: {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+62 812 3456 7890',
      email: 'sarah.johnson@pradjaartha.com'
    },
    views: 245,
    likes: 18,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-05T15:30:00Z',
    featured: true,
    published: true
  },
  
  {
    id: 2,
    title: 'Luxury Villa with Ocean View',
    slug: 'luxury-villa-ocean-view-bali',
    description: 'Stunning 5-bedroom villa with direct ocean views and private beach access. Perfect for tropical paradise living with modern Balinese architecture.',
    type: 'Villa',
    status: 'For Sale',
    price: 5000000000,
    location: {
      address: 'Jl. Pantai Berawa No. 88',
      city: 'Canggu',
      province: 'Bali',
      country: 'Indonesia',
      zipCode: '80361',
      coordinates: { lat: -8.6481, lng: 115.1380 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      landArea: 500,
      carSpaces: 3,
      floors: 2,
      yearBuilt: 2023,
      furnishing: 'Fully Furnished'
    },
    features: [
      'Private Pool',
      'Ocean View',
      'Beach Access',
      'Garden',
      'BBQ Area',
      'Outdoor Dining',
      'Staff Quarters',
      'Smart Home System',
      'Solar Panels',
      'Water Filtration',
      'Security',
      'Parking'
    ],
    images: [
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Villa+Ocean+1',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Villa+Ocean+2',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Villa+Ocean+3',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Villa+Ocean+4'
    ],
    agent: {
      id: 2,
      name: 'Michael Chen',
      phone: '+62 813 9876 5432',
      email: 'michael.chen@pradjaartha.com'
    },
    views: 378,
    likes: 45,
    createdAt: '2025-01-02T09:00:00Z',
    updatedAt: '2025-01-05T14:20:00Z',
    featured: true,
    published: true
  },
  
  {
    id: 3,
    title: 'Contemporary House in BSD City',
    slug: 'contemporary-house-bsd-city',
    description: 'Beautiful 4-bedroom modern house in prestigious BSD City neighborhood. Features spacious living areas, private garden, and contemporary design.',
    type: 'House',
    status: 'For Sale',
    price: 3200000000,
    location: {
      address: 'Jl. BSD Grand Boulevard No. 45',
      city: 'BSD City',
      province: 'Banten',
      country: 'Indonesia',
      zipCode: '15310',
      coordinates: { lat: -6.2759, lng: 106.6391 }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      landArea: 300,
      carSpaces: 2,
      floors: 2,
      yearBuilt: 2021,
      furnishing: 'Semi Furnished'
    },
    features: [
      'Garden',
      'Carport',
      'Maid Room',
      'Kitchen Set',
      'Water Heater',
      'AC',
      'Closet',
      'Security 24/7',
      'Club House',
      'Jogging Track',
      'Children Playground',
      'Swimming Pool'
    ],
    images: [
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=House+BSD+1',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=House+BSD+2',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=House+BSD+3',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=House+BSD+4'
    ],
    agent: {
      id: 3,
      name: 'Linda Martinez',
      phone: '+62 821 5555 4444',
      email: 'linda.martinez@pradjaartha.com'
    },
    views: 192,
    likes: 23,
    createdAt: '2025-01-03T11:30:00Z',
    updatedAt: '2025-01-05T16:45:00Z',
    featured: true,
    published: true
  },
  
  {
    id: 4,
    title: 'Minimalist Studio Apartment Menteng',
    slug: 'minimalist-studio-apartment-menteng',
    description: 'Cozy studio apartment in prestigious Menteng area. Perfect for young professionals, fully furnished with modern amenities.',
    type: 'Apartment',
    status: 'For Rent',
    price: 800000000,
    location: {
      address: 'Jl. HOS Cokroaminoto No. 88',
      city: 'Menteng',
      province: 'DKI Jakarta',
      country: 'Indonesia',
      zipCode: '10310',
      coordinates: { lat: -6.1944, lng: 106.8229 }
    },
    specs: {
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      landArea: null,
      carSpaces: 1,
      floors: 1,
      yearBuilt: 2020,
      furnishing: 'Fully Furnished'
    },
    features: [
      'AC',
      'Wi-Fi',
      'Kitchen',
      'Wardrobe',
      'Water Heater',
      'Laundry',
      'Security',
      'Elevator',
      'Parking',
      'CCTV'
    ],
    images: [
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Studio+1',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Studio+2'
    ],
    agent: {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+62 812 3456 7890',
      email: 'sarah.johnson@pradjaartha.com'
    },
    views: 156,
    likes: 12,
    createdAt: '2025-01-04T08:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
    featured: false,
    published: true
  },
  
  {
    id: 5,
    title: 'Family House with Garden in Pondok Indah',
    slug: 'family-house-garden-pondok-indah',
    description: 'Spacious 5-bedroom family home in elite Pondok Indah neighborhood. Large garden, swimming pool, and excellent security.',
    type: 'House',
    status: 'For Sale',
    price: 4500000000,
    location: {
      address: 'Jl. Pondok Indah Raya No. 12',
      city: 'Pondok Indah',
      province: 'DKI Jakarta',
      country: 'Indonesia',
      zipCode: '12310',
      coordinates: { lat: -6.2648, lng: 106.7844 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 4,
      area: 280,
      landArea: 400,
      carSpaces: 3,
      floors: 2,
      yearBuilt: 2019,
      furnishing: 'Semi Furnished'
    },
    features: [
      'Private Pool',
      'Large Garden',
      'Gazebo',
      'Maid Quarters',
      'Home Theater',
      'Wine Cellar',
      'Smart Home',
      'CCTV',
      'Security 24/7',
      'Backup Generator',
      'Water Filter',
      'Solar Water Heater'
    ],
    images: [
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Pondok+Indah+1',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Pondok+Indah+2',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Pondok+Indah+3',
      'https://via.placeholder.com/800x600/c8a882/ffffff?text=Pondok+Indah+4',
      'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Pondok+Indah+5'
    ],
    agent: {
      id: 2,
      name: 'Michael Chen',
      phone: '+62 813 9876 5432',
      email: 'michael.chen@pradjaartha.com'
    },
    views: 289,
    likes: 34,
    createdAt: '2025-01-05T07:00:00Z',
    updatedAt: '2025-01-05T17:00:00Z',
    featured: true,
    published: true
  },

  // Additional properties (6-20) - Various types and locations
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    title: `Property ${i + 6} - ${['House', 'Apartment', 'Villa'][i % 3]}`,
    slug: `property-${i + 6}-slug`,
    description: `Description for property ${i + 6}. Modern design with excellent facilities and strategic location.`,
    type: ['House', 'Apartment', 'Villa'][i % 3],
    status: i % 2 === 0 ? 'For Sale' : 'For Rent',
    price: (1000000000 + (i * 500000000)),
    location: {
      address: `Jl. Sample Street No. ${i + 10}`,
      city: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'][i % 4],
      province: ['DKI Jakarta', 'Jawa Barat', 'Jawa Timur', 'Bali'][i % 4],
      country: 'Indonesia',
      zipCode: `${10000 + i}00`,
      coordinates: { lat: -6.2 + (i * 0.01), lng: 106.8 + (i * 0.01) }
    },
    specs: {
      bedrooms: 2 + (i % 4),
      bathrooms: 1 + (i % 3),
      area: 80 + (i * 10),
      landArea: i % 3 === 0 ? 150 + (i * 20) : null,
      carSpaces: 1 + (i % 3),
      floors: 1 + (i % 2),
      yearBuilt: 2018 + (i % 5),
      furnishing: ['Unfurnished', 'Semi Furnished', 'Fully Furnished'][i % 3]
    },
    features: [
      'Air Conditioning',
      'Parking',
      'Security 24/7',
      'Garden',
      'Balcony'
    ],
    images: [
      `https://via.placeholder.com/800x600/${i % 2 === 0 ? '1a4d2e' : 'c8a882'}/ffffff?text=Property+${i + 6}+Main`,
      `https://via.placeholder.com/800x600/${i % 2 === 0 ? 'c8a882' : '1a4d2e'}/ffffff?text=Property+${i + 6}+Detail`
    ],
    agent: {
      id: (i % 3) + 1,
      name: ['Sarah Johnson', 'Michael Chen', 'Linda Martinez'][i % 3],
      phone: `+62 81${i % 10} ${1000 + i} ${2000 + i}`,
      email: ['sarah.johnson', 'michael.chen', 'linda.martinez'][i % 3] + '@pradjaartha.com'
    },
    views: 50 + (i * 20),
    likes: 5 + (i * 2),
    createdAt: `2024-12-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
    updatedAt: `2025-01-0${(i % 5) + 1}T15:00:00Z`,
    featured: i % 5 === 0,
    published: true
  }))
];

// Property statistics
export const propertyStats = {
  total: properties.length,
  forSale: properties.filter(p => p.status === 'For Sale').length,
  forRent: properties.filter(p => p.status === 'For Rent').length,
  featured: properties.filter(p => p.featured).length,
  byType: {
    House: properties.filter(p => p.type === 'House').length,
    Apartment: properties.filter(p => p.type === 'Apartment').length,
    Villa: properties.filter(p => p.type === 'Villa').length
  },
  byCity: properties.reduce((acc, p) => {
    const city = p.location.city;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {})
};

export default properties;
