/**
 * SEO Configuration
 * Default SEO settings for the application
 */

export const defaultSEO = {
  // Site Info
  siteName: 'PT Pradja Artha Sejahtera',
  siteUrl: 'https://pradjaartha.com',
  
  // Default Meta
  defaultTitle: 'PT Pradja Artha Sejahtera - Real Estate Platform',
  defaultDescription: 'Your trusted real estate partner in Indonesia. Find your dream property with us.',
  defaultKeywords: 'real estate, property, Indonesia, Jakarta, house, apartment, villa',
  
  // Social Media
  social: {
    twitter: '@pradjaartha',
    facebook: 'pradjaartha',
    instagram: 'pradjaartha',
  },
  
  // Open Graph
  ogType: 'website',
  ogImage: '/assets/images/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterImage: '/assets/images/twitter-card.jpg',
  
  // Additional
  themeColor: '#1a4d2e',
  locale: 'id_ID',
  alternateLocale: 'en_US',
};

// Backward compatibility
export const SEO_CONFIG = defaultSEO;

/**
 * Generate page title
 * @param {string} pageTitle - Page specific title
 * @returns {string} - Full formatted title
 */
export const getPageTitle = (pageTitle) => {
  if (!pageTitle) return defaultSEO.defaultTitle;
  return `${pageTitle} | ${defaultSEO.siteName}`;
};

// Backward compatibility
export const generateTitle = getPageTitle;

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @returns {string} - Full URL
 */
export const getCanonicalUrl = (path = '') => {
  return `${defaultSEO.siteUrl}${path}`;
};

// Backward compatibility
export const generateUrl = getCanonicalUrl;

/**
 * Generate Open Graph image URL
 * @param {string} imagePath - Image path
 * @returns {string} - Full image URL
 */
export const getOgImageUrl = (imagePath) => {
  if (!imagePath) return getCanonicalUrl(defaultSEO.ogImage);
  return imagePath.startsWith('http') ? imagePath : getCanonicalUrl(imagePath);
};

// Backward compatibility
export const generateOgImage = getOgImageUrl;

export default defaultSEO;
