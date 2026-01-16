/**
 * Email Validators
 * Specialized email validation functions
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
};

export const isValidEmailDomain = (email, allowedDomains = []) => {
  if (!isValidEmail(email)) return false;
  if (allowedDomains.length === 0) return true;

  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};

export const normalizeEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

export default {
  isValidEmail,
  isValidEmailDomain,
  normalizeEmail,
};
