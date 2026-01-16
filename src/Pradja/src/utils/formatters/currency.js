/**
 * Currency Formatters
 * Utility functions for formatting currency values
 */

/**
 * Format number to Indonesian Rupiah
 * @param {number} amount
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * formatCurrency(2500000000) // "Rp 2.500.000.000"
 * formatCurrency(2500000000, { compact: true }) // "Rp 2,5 M"
 */
export const formatCurrency = (amount, options = {}) => {
  const {
    locale = 'id-ID',
    currency = 'IDR',
    compact = false,
    showSymbol = true,
  } = options;

  if (amount === null || amount === undefined || isNaN(amount)) {
    return showSymbol ? 'Rp 0' : '0';
  }

  // Compact notation (for large numbers)
  if (compact) {
    return formatCompactCurrency(amount, showSymbol);
  }

  // Standard formatting
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatted;
};

/**
 * Format currency in compact notation
 * @param {number} amount
 * @param {boolean} showSymbol
 * @returns {string}
 * 
 * @example
 * formatCompactCurrency(2500000000) // "Rp 2,5 B"
 * formatCompactCurrency(1500000) // "Rp 1,5 M"
 */
export const formatCompactCurrency = (amount, showSymbol = true) => {
  const symbol = showSymbol ? 'Rp ' : '';
  
  if (amount === 0) return `${symbol}0`;
  
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  
  // Trillions (Triliun)
  if (abs >= 1_000_000_000_000) {
    return `${sign}${symbol}${(abs / 1_000_000_000_000).toFixed(1)} T`;
  }
  
  // Billions (Miliar)
  if (abs >= 1_000_000_000) {
    return `${sign}${symbol}${(abs / 1_000_000_000).toFixed(1)} B`;
  }
  
  // Millions (Juta)
  if (abs >= 1_000_000) {
    return `${sign}${symbol}${(abs / 1_000_000).toFixed(1)} M`;
  }
  
  // Thousands (Ribu)
  if (abs >= 1_000) {
    return `${sign}${symbol}${(abs / 1_000).toFixed(1)} K`;
  }
  
  return `${sign}${symbol}${abs}`;
};

/**
 * Parse currency string to number
 * @param {string} currencyString
 * @returns {number}
 * 
 * @example
 * parseCurrency("Rp 2.500.000") // 2500000
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString !== 'string') return 0;
  
  // Remove all non-numeric characters except decimal point
  const cleaned = currencyString.replace(/[^0-9,.]/g, '');
  
  // Replace comma with empty (for Indonesian format)
  // Or replace dot with empty (for other formats)
  const normalized = cleaned.replace(/[.,]/g, '');
  
  return parseInt(normalized, 10) || 0;
};

/**
 * Format price range
 * @param {number} min
 * @param {number} max
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * formatPriceRange(1000000, 5000000) // "Rp 1 M - Rp 5 M"
 */
export const formatPriceRange = (min, max, options = {}) => {
  const { compact = true, showSymbol = true } = options;
  
  const minFormatted = formatCurrency(min, { compact, showSymbol });
  const maxFormatted = formatCurrency(max, { compact, showSymbol: false });
  
  return `${minFormatted} - ${showSymbol ? 'Rp ' : ''}${maxFormatted}`;
};

/**
 * Format as percentage
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 * 
 * @example
 * formatPercentage(0.185) // "18.5%"
 */
export const formatPercentage = (value, decimals = 1) => {
  if (isNaN(value)) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format file size
 * @param {number} bytes
 * @returns {string}
 * 
 * @example
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1048576) // "1 MB"
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

/**
 * Calculate monthly payment
 * @param {number} principal
 * @param {number} annualRate (in percentage, e.g., 5 for 5%)
 * @param {number} years
 * @returns {number}
 * 
 * @example
 * calculateMonthlyPayment(1000000000, 5, 15) // Monthly mortgage payment
 */
export const calculateMonthlyPayment = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
};

export default {
  formatCurrency,
  formatCompactCurrency,
  parseCurrency,
  formatPriceRange,
  formatPercentage,
  formatFileSize,
  calculateMonthlyPayment,
};
