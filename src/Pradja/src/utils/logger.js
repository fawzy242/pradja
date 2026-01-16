/**
 * Logger Utility
 * Console logging with levels and formatting
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  constructor(level = 'INFO') {
    this.level = LOG_LEVELS[level] || LOG_LEVELS.INFO;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  debug(...args) {
    if (this.level <= LOG_LEVELS.DEBUG && this.isDevelopment) {
      console.debug('🐛 [DEBUG]', ...args);
    }
  }

  info(...args) {
    if (this.level <= LOG_LEVELS.INFO && this.isDevelopment) {
      console.info('ℹ️ [INFO]', ...args);
    }
  }

  warn(...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn('⚠️ [WARN]', ...args);
    }
  }

  error(...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error('❌ [ERROR]', ...args);
    }
  }

  group(label, callback) {
    if (this.isDevelopment) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  }

  table(data) {
    if (this.isDevelopment) {
      console.table(data);
    }
  }
}

export const logger = new Logger();

export default logger;
