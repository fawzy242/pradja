/**
 * Date Formatters
 * Utility functions for formatting dates and times
 */

/**
 * Format date to localized string
 * @param {Date|string} date
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * formatDate(new Date()) // "5 Januari 2025"
 * formatDate(new Date(), { format: 'short' }) // "05/01/2025"
 */
export const formatDate = (date, options = {}) => {
  const {
    locale = 'id-ID',
    format = 'long', // 'short', 'long', 'full'
  } = options;

  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';

  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(d);
      
    case 'long':
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d);
      
    case 'full':
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d);
      
    default:
      return d.toLocaleDateString(locale);
  }
};

/**
 * Format time to localized string
 * @param {Date|string} date
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * formatTime(new Date()) // "14:30"
 * formatTime(new Date(), { showSeconds: true }) // "14:30:45"
 */
export const formatTime = (date, options = {}) => {
  const {
    locale = 'id-ID',
    showSeconds = false,
    hour12 = false,
  } = options;

  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12,
  }).format(d);
};

/**
 * Format date and time
 * @param {Date|string} date
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * formatDateTime(new Date()) // "5 Januari 2025, 14:30"
 */
export const formatDateTime = (date, options = {}) => {
  const dateStr = formatDate(date, options);
  const timeStr = formatTime(date, options);
  
  return `${dateStr}, ${timeStr}`;
};

/**
 * Format relative time (time ago)
 * @param {Date|string} date
 * @param {string} locale
 * @returns {string}
 * 
 * @example
 * formatRelativeTime(new Date(Date.now() - 60000)) // "1 minute ago"
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 */
export const formatRelativeTime = (date, locale = 'en') => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diff = now - d;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return locale === 'id' ? 'baru saja' : 'just now';
  } else if (minutes < 60) {
    return locale === 'id' 
      ? `${minutes} menit yang lalu`
      : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return locale === 'id'
      ? `${hours} jam yang lalu`
      : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return locale === 'id'
      ? `${days} hari yang lalu`
      : `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return locale === 'id'
      ? `${months} bulan yang lalu`
      : `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    return locale === 'id'
      ? `${years} tahun yang lalu`
      : `${years} year${years > 1 ? 's' : ''} ago`;
  }
};

/**
 * Get day of week
 * @param {Date|string} date
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * getDayOfWeek(new Date()) // "Senin"
 */
export const getDayOfWeek = (date, options = {}) => {
  const { locale = 'id-ID', format = 'long' } = options;
  
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    weekday: format,
  }).format(d);
};

/**
 * Get month name
 * @param {Date|string|number} date
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * getMonthName(new Date()) // "Januari"
 * getMonthName(0) // "Januari" (month index)
 */
export const getMonthName = (date, options = {}) => {
  const { locale = 'id-ID', format = 'long' } = options;
  
  let d;
  if (typeof date === 'number') {
    d = new Date(2024, date, 1); // Year doesn't matter for month name
  } else {
    d = typeof date === 'string' ? new Date(date) : date;
  }
  
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(d);
};

/**
 * Check if date is today
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
};

/**
 * Check if date is yesterday
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isYesterday = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return d.getDate() === yesterday.getDate() &&
         d.getMonth() === yesterday.getMonth() &&
         d.getFullYear() === yesterday.getFullYear();
};

/**
 * Calculate age from birthdate
 * @param {Date|string} birthdate
 * @returns {number}
 */
export const calculateAge = (birthdate) => {
  const birth = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Get date range string
 * @param {Date|string} startDate
 * @param {Date|string} endDate
 * @param {Object} options
 * @returns {string}
 * 
 * @example
 * getDateRange(new Date('2025-01-01'), new Date('2025-01-05'))
 * // "1 - 5 Januari 2025"
 */
export const getDateRange = (startDate, endDate, options = {}) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const { locale = 'id-ID' } = options;
  
  // Same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const monthName = getMonthName(start, { locale });
    return `${start.getDate()} - ${end.getDate()} ${monthName} ${start.getFullYear()}`;
  }
  
  // Different months
  return `${formatDate(start, { locale, format: 'short' })} - ${formatDate(end, { locale, format: 'short' })}`;
};

/**
 * Add days to date
 * @param {Date|string} date
 * @param {number} days
 * @returns {Date}
 */
export const addDays = (date, days) => {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Format ISO date for input fields
 * @param {Date|string} date
 * @returns {string}
 * 
 * @example
 * formatForInput(new Date()) // "2025-01-05"
 */
export const formatForInput = (date) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  getDayOfWeek,
  getMonthName,
  isToday,
  isYesterday,
  calculateAge,
  getDateRange,
  addDays,
  formatForInput,
};
