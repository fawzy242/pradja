/**
 * Company Service
 * Mock API service for company information
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock company data
const companyInfo = {
  name: 'PT Pradja Artha Sejahtera',
  tagline: 'Your Trusted Real Estate Partner',
  founded: '2010',
  description: 'Leading real estate company in Indonesia with over 13 years of experience.',
  mission: 'To provide quality properties and excellent service to our clients.',
  vision: 'To be the most trusted real estate company in Indonesia.',
  contact: {
    phone: '+62 21 1234 5678',
    email: 'info@pradjaartha.com',
    whatsapp: '+62 812 3456 7890',
  },
  address: {
    street: 'Jl. Sudirman No. 123',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    country: 'Indonesia',
  },
  social: {
    facebook: 'https://facebook.com/pradjaartha',
    instagram: 'https://instagram.com/pradjaartha',
    twitter: 'https://twitter.com/pradjaartha',
    linkedin: 'https://linkedin.com/company/pradjaartha',
  },
  hours: {
    weekdays: '09:00 - 18:00',
    saturday: '09:00 - 15:00',
    sunday: 'Closed',
  },
};

export const getCompanyInfo = async () => {
  await delay(500);
  return { success: true, data: companyInfo };
};

export const updateCompanyInfo = async (data) => {
  await delay(800);
  Object.assign(companyInfo, data);
  return { success: true, data: companyInfo };
};

export default {
  getCompanyInfo,
  updateCompanyInfo,
};
