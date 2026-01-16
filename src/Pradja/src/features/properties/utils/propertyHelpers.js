/**
 * Property Helper Functions
 * Utility functions for property operations
 */

export const formatPropertyPrice = (price) => {
  if (!price) return 'N/A';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatPropertyArea = (area) => {
  if (!area) return 'N/A';
  return `${area.toLocaleString('id-ID')} m²`;
};

export const getPropertyTypeLabel = (type) => {
  const types = {
    house: 'House',
    apartment: 'Apartment',
    villa: 'Villa',
    land: 'Land',
    commercial: 'Commercial',
  };
  return types[type] || type;
};

export const getPropertyStatusLabel = (status) => {
  const statuses = {
    sale: 'For Sale',
    rent: 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  };
  return statuses[status] || status;
};

export const getPropertyStatusColor = (status) => {
  const colors = {
    sale: 'success',
    rent: 'info',
    sold: 'muted',
    rented: 'muted',
  };
  return colors[status] || 'default';
};

export const calculatePropertyPricePerSqm = (price, area) => {
  if (!price || !area) return 0;
  return Math.round(price / area);
};

export default {
  formatPropertyPrice,
  formatPropertyArea,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getPropertyStatusColor,
  calculatePropertyPricePerSqm,
};
