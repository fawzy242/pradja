/**
 * File Validators
 * File validation functions
 */

export const isValidFileSize = (file, maxSizeMB = 5) => {
  if (!file) return false;
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};

export const isValidFileType = (file, allowedTypes = []) => {
  if (!file) return false;
  if (allowedTypes.length === 0) return true;
  
  return allowedTypes.some((type) => {
    if (type.includes('*')) {
      const pattern = type.replace('*', '.*');
      const regex = new RegExp(pattern);
      return regex.test(file.type);
    }
    return file.type === type;
  });
};

export const isValidImage = (file) => {
  return isValidFileType(file, ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']);
};

export const isValidDocument = (file) => {
  return isValidFileType(file, [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]);
};

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export default {
  isValidFileSize,
  isValidFileType,
  isValidImage,
  isValidDocument,
  getFileExtension,
};
