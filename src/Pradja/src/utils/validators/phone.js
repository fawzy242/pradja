/**
 * Phone Number Validation
 * Validator functions for phone numbers
 */

/**
 * Validate Indonesian phone number
 * Accepts formats: 08xx, +62xxx, 62xxx
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidIndonesianPhone = (phone) => {
  if (!phone) return false;
  
  // Remove all spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Indonesian phone patterns
  const patterns = [
    /^08[0-9]{8,11}$/,        // 08xxxxxxxxx (10-13 digits)
    /^\+628[0-9]{8,11}$/,     // +628xxxxxxxxx
    /^628[0-9]{8,11}$/,       // 628xxxxxxxxx
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
};

/**
 * Format Indonesian phone number to standard format
 * Converts to +62 format
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatIndonesianPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all spaces, dashes, and parentheses
  let cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Convert 08xx to +628xx
  if (cleaned.startsWith('08')) {
    cleaned = '+62' + cleaned.substring(1);
  }
  // Convert 628xx to +628xx
  else if (cleaned.startsWith('628')) {
    cleaned = '+' + cleaned;
  }
  // Already in +62 format
  else if (!cleaned.startsWith('+62')) {
    return phone; // Return original if format not recognized
  }
  
  return cleaned;
};

/**
 * Validate general phone number (international)
 * Basic validation for any phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Must be between 8-15 digits (international standard)
  const digitsOnly = cleaned.replace(/\+/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
};

export default {
  isValidIndonesianPhone,
  formatIndonesianPhone,
  isValidPhone,
};
