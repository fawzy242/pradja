/**
 * Text Formatters
 * Utility functions for formatting text
 */

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

export const truncate = (str, maxLength = 100, suffix = '...') => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + suffix;
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const removeHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

export const excerpt = (str, maxLength = 150) => {
  if (!str) return '';
  const clean = removeHtmlTags(str);
  return truncate(clean, maxLength);
};

export default {
  capitalize,
  capitalizeWords,
  truncate,
  slugify,
  removeHtmlTags,
  excerpt,
};
