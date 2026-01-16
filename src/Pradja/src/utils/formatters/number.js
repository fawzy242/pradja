/**
 * Number Formatters
 * Utility functions for formatting numbers
 */

export const formatNumber = (value, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale).format(value);
};

export const formatCompactNumber = (value, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDecimal = (value, decimals = 2) => {
  return value.toFixed(decimals);
};

export const parseNumber = (value) => {
  const cleaned = value.toString().replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

export default {
  formatNumber,
  formatCompactNumber,
  formatPercentage,
  formatDecimal,
  parseNumber,
};
