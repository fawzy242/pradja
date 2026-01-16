/**
 * Form Validators
 * Utility functions for form validation
 */

/**
 * Validate email address
 * @param {string} email
 * @returns {boolean}
 * 
 * @example
 * isValidEmail("test@example.com") // true
 * isValidEmail("invalid-email") // false
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate Indonesian phone number
 * @param {string} phone
 * @returns {boolean}
 * 
 * @example
 * isValidPhone("+628123456789") // true
 * isValidPhone("08123456789") // true
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Indonesian phone patterns:
  // +62812345678 (with country code)
  // 0812345678 (without country code)
  // Must be 10-13 digits
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  
  return phoneRegex.test(cleaned);
};

/**
 * Validate password strength
 * @param {string} password
 * @param {Object} options
 * @returns {Object}
 * 
 * @example
 * validatePassword("MyP@ssw0rd")
 * // { isValid: true, strength: "strong", errors: [] }
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  const errors = [];
  
  if (!password) {
    return {
      isValid: false,
      strength: 'weak',
      errors: ['Password is required'],
    };
  }

  // Check length
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  // Check uppercase
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check lowercase
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check numbers
  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check special characters
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Calculate strength
  let strength = 'weak';
  if (errors.length === 0) {
    if (password.length >= 12) {
      strength = 'strong';
    } else if (password.length >= 10) {
      strength = 'medium';
    }
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  };
};

/**
 * Validate URL
 * @param {string} url
 * @returns {boolean}
 */
export const isValidURL = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate Indonesian ID Card (KTP)
 * @param {string} ktp
 * @returns {boolean}
 */
export const isValidKTP = (ktp) => {
  if (!ktp || typeof ktp !== 'string') return false;
  
  // KTP must be exactly 16 digits
  const ktpRegex = /^[0-9]{16}$/;
  return ktpRegex.test(ktp);
};

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber
 * @returns {boolean}
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Must be 13-19 digits
  if (!/^[0-9]{13,19}$/.test(cleaned)) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate postal code (ZIP code)
 * @param {string} postalCode
 * @param {string} country
 * @returns {boolean}
 */
export const isValidPostalCode = (postalCode, country = 'ID') => {
  if (!postalCode || typeof postalCode !== 'string') return false;
  
  const patterns = {
    ID: /^[0-9]{5}$/, // Indonesian: 5 digits
    US: /^[0-9]{5}(-[0-9]{4})?$/, // US: 12345 or 12345-6789
    UK: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i, // UK format
  };
  
  const pattern = patterns[country];
  return pattern ? pattern.test(postalCode.trim()) : false;
};

/**
 * Validate required field
 * @param {any} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 * @param {string} value
 * @param {number} min
 * @returns {boolean}
 */
export const minLength = (value, min) => {
  if (!value || typeof value !== 'string') return false;
  return value.length >= min;
};

/**
 * Validate maximum length
 * @param {string} value
 * @param {number} max
 * @returns {boolean}
 */
export const maxLength = (value, max) => {
  if (!value || typeof value !== 'string') return true; // Empty is valid for max
  return value.length <= max;
};

/**
 * Validate number range
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Validate file size
 * @param {File} file
 * @param {number} maxSizeInMB
 * @returns {boolean}
 */
export const isValidFileSize = (file, maxSizeInMB) => {
  if (!file) return false;
  const maxBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxBytes;
};

/**
 * Validate file type
 * @param {File} file
 * @param {Array<string>} allowedTypes
 * @returns {boolean}
 * 
 * @example
 * isValidFileType(file, ['image/jpeg', 'image/png'])
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate image file
 * @param {File} file
 * @returns {boolean}
 */
export const isValidImage = (file) => {
  return isValidFileType(file, [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ]);
};

/**
 * Validate date format
 * @param {string} dateString
 * @param {string} format - 'YYYY-MM-DD', 'DD/MM/YYYY', etc.
 * @returns {boolean}
 */
export const isValidDate = (dateString, format = 'YYYY-MM-DD') => {
  if (!dateString || typeof dateString !== 'string') return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validate age (must be adult)
 * @param {Date|string} birthdate
 * @param {number} minAge
 * @returns {boolean}
 */
export const isValidAge = (birthdate, minAge = 18) => {
  const birth = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= minAge;
};

/**
 * Get validation error message
 * @param {string} field
 * @param {string} rule
 * @param {any} param
 * @returns {string}
 */
export const getValidationMessage = (field, rule, param) => {
  const messages = {
    required: `${field} is required`,
    email: `Please enter a valid email address`,
    phone: `Please enter a valid phone number`,
    minLength: `${field} must be at least ${param} characters`,
    maxLength: `${field} must be at most ${param} characters`,
    min: `${field} must be at least ${param}`,
    max: `${field} must be at most ${param}`,
    url: `Please enter a valid URL`,
    password: `Password must meet security requirements`,
  };
  
  return messages[rule] || `${field} is invalid`;
};

export default {
  isValidEmail,
  isValidPhone,
  validatePassword,
  isValidURL,
  isValidKTP,
  isValidCreditCard,
  isValidPostalCode,
  isRequired,
  minLength,
  maxLength,
  isInRange,
  isValidFileSize,
  isValidFileType,
  isValidImage,
  isValidDate,
  isValidAge,
  getValidationMessage,
};
